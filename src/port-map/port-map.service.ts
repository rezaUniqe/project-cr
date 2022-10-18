import { Injectable } from '@nestjs/common';
import {SessionType} from "../../ws-api-client/src/api/commonTypes";
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";
import {PortMapDto} from "./dto/port-map.dto";

@Injectable()
export class PortMapService {

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


    async getPortMap({
                              sessionAuthHash,
                              sessionType,
                              ...el
                          }: PortMapDto) {
        try {
            setConfig({sessionAuthHash: sessionAuthHash})
            return await apiInstance.portMap.get({
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
