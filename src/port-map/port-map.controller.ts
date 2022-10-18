import {Controller, Get, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {WsApiException} from "../dto/app.dto";
import {PortMapDataResponse, PortMapDto} from "./dto/port-map.dto";
import {PortMapService} from "./port-map.service";

@Controller('port-map')
@ApiTags('port-map')
export class PortMapController {

    constructor(private readonly portMapService:PortMapService) {}

    @Get()
    async getPortMaps(@Query() params: PortMapDto): Promise<PortMapDataResponse> {
        try {
            return await this.portMapService.getPortMap(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


}
