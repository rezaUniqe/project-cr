import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {WsApiException} from "../dto/app.dto";
import {WgConfigService} from "./wg-config.service";
import {WgConfigDto, WgConfigRes} from "./dto/wg-config.dto";

@Controller('wg-config')
@ApiTags('wg-config')
export class WgConfigController {

    constructor(private readonly WgService:WgConfigService) {}

    @Post()
    async getPortMaps(@Body() params: WgConfigDto): Promise<WgConfigRes> {
        try {
            return await this.WgService.getWgConfig(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }




}
