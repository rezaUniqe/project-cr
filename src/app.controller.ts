import {Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('login')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post()
    async getHello(): Promise<any> {
        try {

        } catch (e) {
            return await this.appService.loginUser({
                userName: 'reza',
                password: 'sdsdsd'
            });

        }
    }
}
