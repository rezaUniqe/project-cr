import {Body, Controller,Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {WsApiException} from "../dto/app.dto";
import {WgConfigService} from "./wg-config.service";
import { WgConfigConnectDto, WgConfigInitDto, WgConfigInitResponse, WgConfigRes } from "./dto/wg-config-connect.dto";

@Controller('wg-config')
@ApiTags('wg-config')
export class WgConfigController {

    constructor(private readonly WgService:WgConfigService) {}

    @Post('/connect')
    async WgConfigConnect(@Body() params: WgConfigConnectDto): Promise<WgConfigRes> {
        try {
            return await this.WgService.getWgConfig(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }

    @Post('/init')
    async WgConfigInit(@Body() params: WgConfigInitDto): Promise<WgConfigInitResponse> {
        try {
            return await this.WgService.InitWgConfig(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


}
