import {Injectable} from '@nestjs/common';
import {apiInstance} from "../ws-cli";
import {RecordInstallDto} from "./dto/record-install.dto";

@Injectable()
export class RecordInstallService {


    async submitRecord( args: RecordInstallDto) {
        try {
            return await apiInstance.recordInstall.post({
                ...args
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }


}
