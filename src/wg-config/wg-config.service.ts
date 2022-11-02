import {Injectable} from '@nestjs/common';
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";
import { WgConfigConnectDto, WgConfigInitDto, WgConfigInitResponse, WgConfigRes } from "./dto/wg-config-connect.dto";
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
                      }: WgConfigConnectDto): Promise<WgConfigRes> {
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


  async InitWgConfig({
    sessionAuthHash,
    sessionType,
    ...args
  }: WgConfigInitDto): Promise<WgConfigInitResponse> {
      try {
        setConfig({
          sessionAuthHash: sessionAuthHash
        })
        return await apiInstance.WgConfigInit.post({
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
