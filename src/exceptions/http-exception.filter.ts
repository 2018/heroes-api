import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.code;

        response
            .status(status)
            .json({
                statusCode: exception.message,
                message: 'Not Found',
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}