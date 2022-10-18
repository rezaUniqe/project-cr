import { Module } from '@nestjs/common';
import { PortMapController } from './port-map.controller';
import { PortMapService } from './port-map.service';

@Module({
  controllers: [PortMapController],
  providers: [PortMapService]
})
export class PortMapModule {}
