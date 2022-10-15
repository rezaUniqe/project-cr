import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {Request, Response} from 'express';
import {WsApiException} from "./dto/app.dto";

@Catch(WsApiException)
export class WsHttpExceptionFilter implements ExceptionFilter {
    catch(exception: WsApiException, host: ArgumentsHost) {

        console.log('edsds',exception)

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.code;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                message: exception.message,
                path: request.url,
            });
    }


}