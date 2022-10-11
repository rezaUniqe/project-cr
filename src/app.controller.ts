import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('login')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('send')
    async getHello(): Promise<any> {
        try {
            return await this.appService.loginUser({
                userName: 'mobinyardim',
                password: 'CL5eFwpj3N!W!Z3'
            });
        } catch (e) {
            return e

        }
    }

    @Get('server')
    async getServerList(): Promise<any> {
        try {
            return await this.appService.serverList();
        } catch (e) {
            return e
        }
    }
}
