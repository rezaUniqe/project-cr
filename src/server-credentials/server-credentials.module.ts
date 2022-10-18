import { Module } from '@nestjs/common';
import { ServerCredentialsController } from './server-credentials.controller';
import { ServerCredentialsService } from './server-credentials.service';

@Module({
  controllers: [ServerCredentialsController],
  providers: [ServerCredentialsService]
})
export class ServerCredentialsModule {}
