import {Injectable} from '@nestjs/common';
import {
    GetServerListRequestParamsDto,
    GetServerListResponseDto
} from "./dto/server-list.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";


@Injectable()
export class ServerListService {


    async getServerList({sessionAuthHash,...args}: GetServerListRequestParamsDto): Promise<GetServerListResponseDto> {
        try {
            setConfig({
                sessionAuthHash:sessionAuthHash
            })
            return await apiInstance.serverList.get(args)
        } catch (error) {
            throw error
        }
    }


}
