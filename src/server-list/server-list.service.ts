import {Injectable} from '@nestjs/common';
import {GetServerListRequestParamsDto, GetServerListResponseDto} from "./dto/server-list.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";


@Injectable()
export class ServerListService {


    async getServerList({sessionAuthHash,type,premium,...args}: GetServerListRequestParamsDto): Promise<GetServerListResponseDto> {
        try {
            setConfig({
                sessionAuthHash:sessionAuthHash
            })
            return await apiInstance.serverList.get({...args,type:type.toString()})
        } catch (error) {
            throw error
        }
    }


}
