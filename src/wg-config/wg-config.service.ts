import {Injectable} from '@nestjs/common';
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";
import {WgConfigDto, WgConfigRes} from "./dto/wg-config.dto";
import {SessionType} from "../../ws-api-client/src/api/commonTypes";

@Injectable()
export class WgConfigService {


    getSessionTypeId(s: SessionType) {
        switch (s.toString()) {
            case "WEBSITE":
                return 1;
            case 'MOBILE':
                return 4;
            case 'EXTENSION':
                return 3;
            case 'DESKTOP':
                return 2;
        }
    }

    async getWgConfig({
                          sessionAuthHash,
                          sessionType,
                          ...args
                      }: WgConfigDto): Promise<WgConfigRes> {
        try {
            setConfig({
                sessionAuthHash: sessionAuthHash
            })
            return await apiInstance.WgConfig.post({
                params: {
                    session_type_id: this.getSessionTypeId(sessionType as SessionType)
                    , ...args
                }
            })
        } catch (error) {
            throw error
        }
    }


}
