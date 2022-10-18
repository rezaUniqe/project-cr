import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

import {SessionService} from "./session.service";
import {
    CurrentSessionParams,
    LoginBodyDto,
    SessionData
} from "./dto/session.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {WsApiException} from "../dto/app.dto";


@ApiTags('session')
@Controller('session')
export class SessionController {

    constructor(private readonly sessionService: SessionService) {}

    @ApiOkResponse({
        type: SessionData,
        status: 200,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @Post('login')
    async logIn(@Body() body: LoginBodyDto): Promise<SessionData> {
        try {
            return await this.sessionService.loginUser(body);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }

    @Get('/current')
    @ApiOkResponse({
        type: SessionData,
        status: 200,
        description: 'The resource was returned successfully'
    })
    async getSession(@Query() query:CurrentSessionParams): Promise<SessionData> {
        try {
            return await this.sessionService.getCurrentUserSession({sessionAuthHash:query.sessionAuthHash});
        } catch (e) {
            throw new WsApiException({...e})
        }
    }



}
