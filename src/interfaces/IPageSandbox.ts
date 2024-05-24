import { IScriptFunctionExecutor } from "./IScriptFunctionExecutor";

export interface IPageSanbox {
  getFunctionExecutor(): IScriptFunctionExecutor;
}
