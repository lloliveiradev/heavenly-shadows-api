"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    configureSwagger(app);
    configureValidationPipe(app);
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 5005);
}
function configureSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Heavenly Shadows')
        .setDescription('Aprenda a integrar o frontend com o backend do projeto Heavenly Shadows')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
}
function configureValidationPipe(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: false,
    }));
}
bootstrap();
//# sourceMappingURL=main.js.map