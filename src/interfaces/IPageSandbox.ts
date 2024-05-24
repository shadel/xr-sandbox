import { FallbackType } from "../sandbox-scripts/FallbackOnetimeSandboxScript";
import { IMessageHandler } from "./IMessageHandler";
import { ISandboxScript } from "./ISandboxScript";
import { IScriptFunctionExecutor } from "./IScriptFunctionExecutor";

export interface IPageSanbox {
  getFunctionExecutor(): IScriptFunctionExecutor;
  getMessageHandler(): IMessageHandler;
  load(): Promise<IPageSanbox>;
  executeScript(
    codeblock: ISandboxScript,
    options: { type?: FallbackType; timeout?: number }
  ): Promise<any>;
}
