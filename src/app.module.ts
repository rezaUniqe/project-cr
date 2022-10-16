import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ServerListModule} from './server-list/server-list.module';
import {SessionModule} from './session/session.module';
import { UserModule } from './user/user.module';
import { ServerCredentialsModule } from './server-credentials/server-credentials.module';
import { ServerConfigsModule } from './server-configs/server-configs.module';
import { RecordInstallModule } from './record-install/record-install.module';


@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}), ServerListModule, SessionModule, UserModule, ServerCredentialsModule, ServerConfigsModule, RecordInstallModule],
    controllers: [],
    providers: [],
})

export class AppModule {
}
