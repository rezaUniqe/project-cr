import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ServerListModule} from './server-list/server-list.module';
import {SessionModule} from './session/session.module';
import { UserModule } from './user/user.module';


@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), ServerListModule, SessionModule, UserModule],
    controllers: [],
    providers: [],
})

export class AppModule {
}
