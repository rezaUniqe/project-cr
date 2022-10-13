import {Controller, Get, Param, Query, Req} from '@nestjs/common';
import {ServerListService} from "./server-list.service";
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    GetServerListRequestParamsDto,
    GetServerListResponseDto
} from "./dto/server-list.dto";

@ApiTags('serverList')
@Controller('server-list')
export class ServerListController {
    constructor(private readonly serverListService: ServerListService) {
    }

    @ApiOkResponse({
        type: GetServerListResponseDto,
        status: 200,
        description: 'The resource was returned successfully'})
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    @Get('all')
    async getServerList(@Query() params:GetServerListRequestParamsDto): Promise<GetServerListResponseDto> {
        try {
            return await this.serverListService.getServerList(params);
        } catch (e) {
            throw e
        }
    }
}
