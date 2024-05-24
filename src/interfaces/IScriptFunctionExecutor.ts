import { ISandboxScriptBlock } from "./ISandboxScriptBlock";

export interface IScriptFunctionExecutor {
  injectScript(scriptContent: ISandboxScriptBlock): void;
  executeFunction(functionName: string, args?: any): void;
  executeScript(scriptContent: ISandboxScriptBlock): void;
}
