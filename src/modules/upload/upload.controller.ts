import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

// 8 MB cap — generous for pet photos while protecting the server.
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

@Controller("uploads")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("pet-image")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  async uploadPetImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_IMAGE_BYTES }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|gif|avif)$/ }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("No file provided");
    }
    // Returns { url } — the public Supabase Storage URL to save on the pet.
    return this.uploadService.uploadImage(file);
  }
}
