import {Body, Controller, Delete, Post, Put} from '@nestjs/common';
import {
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";
import {
    ChangeEmailParams,
    ChangePasswordParams,
    CreateAccountParams,
    EmailStatus,
    GhostAccountCreateBodyRequest,
    PasswordStatus,
    UserInfo,
    VoucherParams,
    VoucherStatus
} from "./dto/user.dto";
import {UserService} from "./user.service";
import {WsApiException} from "../dto/app.dto";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/create-ghost')
    @ApiOkResponse({
        type: UserInfo,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    async createGhost(@Body() body: GhostAccountCreateBodyRequest) {
        try {
            return await this.userService.createGhost(body);
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


    @Post('/create-account')
    @ApiOkResponse({
        type: UserInfo,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    async createAccount(@Body() body: CreateAccountParams) {
        try {
            return await this.userService.createAccount(body)
        } catch (e) {
            throw new WsApiException({...e})
        }

    }

    @Post('/apply-voucher')
    @ApiOkResponse({
        type: VoucherStatus,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    async applyVoucher(@Body() body: VoucherParams) {
        try {
            return await this.userService.applyVoucher(body)
        } catch (e) {
            throw new WsApiException({...e})
        }

    }

    @Put('/change-password')
    @ApiOkResponse({
        type: PasswordStatus,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    async changePassword(@Body() body: ChangePasswordParams) {
        try {
            return await this.userService.changePassword(body)
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


    @Put('/change-email-address')
    @ApiOkResponse({
        type: EmailStatus,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    async changeEmailAddress(@Body() body: ChangeEmailParams) {
        try {
            return await this.userService.changeEmail(body)
        } catch (e) {
            throw new WsApiException({...e})
        }

    }


    @Delete('/delete-email-address')
    @ApiOkResponse({
        type: EmailStatus,
        description: 'The resource was returned successfully'
    })
    @ApiForbiddenResponse({description: 'Unauthorized Request'})
    @ApiNotFoundResponse({description: 'Resource not found'})
    async deleteEmailAddress(@Body() body: { sessionAuthHash: string }) {
        try {
            return await this.userService.deleteEmail(body)
        } catch (e) {
            throw new WsApiException({...e})
        }
    }


}
