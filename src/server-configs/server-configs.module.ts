import { Module } from '@nestjs/common';
import { ServerConfigsController } from './server-configs.controller';
import { ServerConfigsService } from './server-configs.service';

@Module({
  controllers: [ServerConfigsController],
  providers: [ServerConfigsService]
})
export class ServerConfigsModule {}
