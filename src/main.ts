import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {
    ValidationPipe
} from "@nestjs/common";
import {WsHttpExceptionFilter} from "./ws-http-exception.filter";
import * as fs from "fs";





async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new WsHttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));

    const config = new DocumentBuilder()
        .setTitle('project-cr')
        .setDescription('The project-cr API description')
        .setVersion('1.0')
        .addServer('http://localhost:7474')
        .addServer('http://0.0.0.0:7474')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));
    SwaggerModule.setup("/api", app, document);
    SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT);
}

bootstrap().then();
