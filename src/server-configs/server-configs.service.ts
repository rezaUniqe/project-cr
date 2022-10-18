import {Injectable} from '@nestjs/common';
import {ServerConfigsDto} from "./dto/server-configs.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {SessionType} from "../../ws-api-client/src/api/commonTypes";
import {apiInstance} from "../ws-cli";

@Injectable()
export class ServerConfigsService {


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

    async getServerConfig({
                              sessionAuthHash,
                              sessionType,
                              platform,
                              ...el
                          }: ServerConfigsDto) {
        try {
            setConfig({sessionAuthHash: sessionAuthHash})
            return await apiInstance.serverConfigs.get({
                headers: {'user-agent': 'okhttp/4.9.3'},
                params: {
                    ...el,
                    session_type_id: this.getSessionTypeId(sessionType as SessionType)
                }
            })
        } catch (error) {
            throw error
        }
    }


}
