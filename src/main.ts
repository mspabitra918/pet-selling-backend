import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  try {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);

    app.setGlobalPrefix("api");
    app.enableCors({ origin: "http://localhost:3000", credentials: true });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    const port = config.get<number>("PORT", 4000);
    await app.listen(port);
    logger.log(
      `🚀 Pet selling backend running on http://localhost:${port}/api`,
    );
  } catch (error) {
    logger.error("Failed to start application", error as Error);
    process.exit(1);
  }
}

bootstrap();
