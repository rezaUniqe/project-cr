import {Injectable} from '@nestjs/common';
import {CurrentSessionParams, LoginBodyDto} from "./dto/session.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";

@Injectable()
export class SessionService {


    getSesstionTypeValue(s: string) {
        switch (s) {
            case 'WEBSITE':
                return 1
            case 'EXTENSION':
                return 2;
            case 'DESKTOP':
                return 3;
            case 'MOBILE':
                return 4;
        }
    }

    async loginUser({sessionType,...args}: LoginBodyDto) {
        try {
            return await apiInstance.session.login({sessionType:this.getSesstionTypeValue(sessionType.toString()),...args})
        } catch (error) {
            throw error
        }
    }

    async getCurrentUserSession({sessionAuthHash}: CurrentSessionParams) {
        try {
            setConfig({
                sessionAuthHash: sessionAuthHash
            })
            return await apiInstance.session.get()
        } catch (error) {
            throw error
        }
    }
}