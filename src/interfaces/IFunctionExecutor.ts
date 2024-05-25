export interface IFunctionExecutor {
  injectScript(scriptContent: string): void;
  executeFunction(functionName: string, args?: any): void;
  executeScript(scriptContent: string, args?: any): void;
}
