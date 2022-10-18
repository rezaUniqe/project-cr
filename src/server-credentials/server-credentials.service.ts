import {Injectable} from '@nestjs/common';
import {ServerCredentialsParams} from "./dto/server-credentials.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";

@Injectable()
export class ServerCredentialsService {




    async getServerCredentials(args: ServerCredentialsParams) {
        try {
            setConfig({sessionAuthHash: args.sessionAuthHash})
            return await apiInstance.serverCredentials.get({type:args.type})
        } catch (error) {
            throw error
        }
    }


}
