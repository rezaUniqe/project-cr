import { Module } from '@nestjs/common';
import { WgConfigController } from './wg-config.controller';
import { WgConfigService } from './wg-config.service';

@Module({
  controllers: [WgConfigController],
  providers: [WgConfigService]
})
export class WgConfigModule {}
