import { Module } from '@nestjs/common';
import {ServerListService} from "./server-list.service";
import {ServerListController} from "./server-list.controller";

@Module({
    controllers:[ServerListController],
    providers:[ServerListService]
})
export class ServerListModule {


}
