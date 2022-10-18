import {Controller, Get, Query} from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";
import {ServerCredentialsService} from "./server-credentials.service";
import {
    Credential,
    ServerCredentialsParams,
    SessionHash
} from "./dto/server-credentials.dto";
import {WsApiException} from "../dto/app.dto";
import {ApiException} from "../../ws-api-client/src/api/commonTypes";

@ApiTags('server-credentials')
@Controller('server-credentials')
export class ServerCredentialsController {
    constructor(private readonly Service: ServerCredentialsService) {}

    @ApiOkResponse({
        type: Credential,
        status: 200,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    @Get()
    async getServerList(@Query() params: ServerCredentialsParams): Promise<Credential> {
        try {
            return await this.Service.getServerCredentials(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


}
