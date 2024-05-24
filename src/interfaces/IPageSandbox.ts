import { IMessageHandler } from "./IMessageHandler";
import { IScriptFunctionExecutor } from "./IScriptFunctionExecutor";

export interface IPageSanbox {
  getFunctionExecutor(): IScriptFunctionExecutor;
  getMessageHandler(): IMessageHandler;
  load(): Promise<IPageSanbox>;
}
