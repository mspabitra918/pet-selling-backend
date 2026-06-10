import {
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import ws from "ws";

/**
 * Handles uploading images to Supabase Storage and returning their public URL.
 *
 * Required env vars (.env):
 *   SUPABASE_URL=https://<project-ref>.supabase.co
 *   SUPABASE_SERVICE_KEY=<service_role key>   (server-side only — keep secret!)
 *   SUPABASE_BUCKET=pet-images                (optional, defaults to pet-images)
 *
 * The bucket must exist. With the service_role key we can upload regardless of
 * RLS/storage policies; the bucket should be public so the returned URL is
 * readable by the storefront.
 */
@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private client: SupabaseClient | null = null;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.get<string>("SUPABASE_BUCKET", "pet-images");
  }

  private getClient(): SupabaseClient {
    if (this.client) return this.client;

    const url = this.config.get<string>("SUPABASE_URL");
    const key = this.config.get<string>("SUPABASE_SERVICE_KEY");

    if (!url || !key) {
      throw new ServiceUnavailableException(
        "Image storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in the backend .env.",
      );
    }

    this.client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { transport: ws },
    });
    return this.client;
  }

  private buildObjectPath(originalName: string): string {
    const clean = (originalName || "image")
      .toLowerCase()
      .replace(/[^a-z0-9.]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    return `pets/${unique}-${clean}`;
  }

  async uploadImage(file: Express.Multer.File): Promise<{ url: string }> {
    const supabase = this.getClient();
    const path = this.buildObjectPath(file.originalname);

    try {
      const { error } = await supabase.storage
        .from(this.bucket)
        .upload(path, file.buffer, {
          contentType: file.mimetype || "image/jpeg",
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        this.logger.error(`Supabase upload failed: ${error.message}`);
        throw new InternalServerErrorException(
          `Upload failed: ${error.message}`,
        );
      }

      const { data } = supabase.storage.from(this.bucket).getPublicUrl(path);
      if (!data?.publicUrl) {
        throw new InternalServerErrorException(
          "Upload succeeded but no public URL was returned.",
        );
      }
      return { url: data.publicUrl };
    } catch (err) {
      if (err instanceof InternalServerErrorException) throw err;
      this.logger.error("Unexpected upload error", err as Error);
      throw new InternalServerErrorException("Could not upload image");
    }
  }
}
