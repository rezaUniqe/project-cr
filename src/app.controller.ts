import {Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('login')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    async getHello(): Promise<any> {
        try {
            return await this.appService.loginUser({
                userName: 'mobinyardim',
                password: 'CL5eFwpj3N!W!Z3'
            });

        } catch (e) {
            console.log(e)
          return e

        }
    }
}
