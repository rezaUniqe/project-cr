import {Controller, Get, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {ServerConfigsService} from "./server-configs.service";
import {WsApiException} from "../dto/app.dto";
import {ServerConfig, ServerConfigsDto} from "./dto/server-configs.dto";

@Controller('server-configs')
@ApiTags('server-configs')
export class ServerConfigsController {

    constructor(private readonly serverConfigs:ServerConfigsService) {}

    @Get()
    async getServerConfig(@Query() params: ServerConfigsDto): Promise<ServerConfig> {
        try {
            return await this.serverConfigs.getServerConfig(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }

}
