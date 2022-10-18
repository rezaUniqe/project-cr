import {Injectable} from '@nestjs/common';
import {create} from "../../ws-api-client/src";
import {
    ChangeEmailParams,
    ChangePasswordParams,
    CreateAccountParams,
    GhostAccountCreateBodyRequest, VoucherParams
} from "./dto/user.dto";
import {setConfig} from "../../ws-api-client/src/api";
import {apiInstance} from "../ws-cli";

@Injectable()
export class UserService {


    async createGhost(args: GhostAccountCreateBodyRequest) {
        try {
            return await apiInstance.users.createGhost(args);
        } catch (e) {
            throw e;
        }
    }

    async createAccount(args: CreateAccountParams) {
        try {
            return await apiInstance.users.createAccount(args);
        } catch (e) {
            throw e;
        }
    }

    async changePassword({sessionAuthHash,...args}: ChangePasswordParams) {
        try {
            setConfig({sessionAuthHash:sessionAuthHash})
            return await apiInstance.users.changePassword(args);
        } catch (e) {
            throw e;
        }
    }

    async changeEmail({sessionAuthHash,...args}: ChangeEmailParams) {
        try {
            setConfig({sessionAuthHash:sessionAuthHash})

            return await apiInstance.users.changeEmailAddress(args);
        } catch (e) {
            throw e;
        }
    }

    async deleteEmail({sessionAuthHash,...args}: { sessionAuthHash: string }) {
        try {
            setConfig({sessionAuthHash:sessionAuthHash})
            return await apiInstance.users.deleteEmail({sessionAuthHash});
        } catch (e) {
            throw e;
        }
    }


    async applyVoucher({sessionAuthHash,...args}:VoucherParams) {
        try {
            setConfig({sessionAuthHash:sessionAuthHash})
            return await apiInstance.users.applyVoucher(args);
        } catch (e) {
            throw e;
        }
    }


}
