import createInstance from './createInstance'
// -- ENDPOINT IMPORTS HERE --
import Notifications from './Notifications/index'
import Session from './Session/index'
import ServerCredentials from './ServerCredentials/index'
import ServerList from './ServerList/index'
import Users from './Users/index'
import RecordInstall from './RecordInstall/index'
import RegToken from './RegToken'
import { Config } from './api/config'
import dotenv from "dotenv";
import ServerConfigs from "./ServerConfigs";
import PortMap from "./PortMap";
import WgConfig from "./WgConfig";
dotenv.config();

// @ts-ignore
global.url = ''

const endpoints = {
  notifications: Notifications,
  session: Session,
  serverCredentials: ServerCredentials,
  serverList: ServerList,
  users: Users,
  recordInstall: RecordInstall,
  regToken: RegToken,
  serverConfigs:ServerConfigs,
  portMap:PortMap,
  WgConfig:WgConfig,
}

export const create = (conf: Config = {}): Record<string, unknown> => createInstance({
  conf,
  endpoints
});
