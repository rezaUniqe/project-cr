import { Module } from '@nestjs/common';
import { RecordInstallService } from './record-install.service';
import { RecordInstallController } from './record-install.controller';

@Module({
  providers: [RecordInstallService],
  controllers: [RecordInstallController]
})
export class RecordInstallModule {}
