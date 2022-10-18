import {Body, Controller, Post} from '@nestjs/common';
import {WsApiException} from "../dto/app.dto";
import {RecordInstallService} from "./record-install.service";
import {RecordInstallDto, RecordInstallResDto} from "./dto/record-install.dto";
import {ApiTags} from "@nestjs/swagger";



@ApiTags('record-install')
@Controller('record-install')
export class RecordInstallController {

    constructor(private readonly record: RecordInstallService) {}

    @Post()
    async submit(@Body() params: RecordInstallDto): Promise<RecordInstallResDto> {
        try {
            return await this.record.submitRecord(params);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


}
