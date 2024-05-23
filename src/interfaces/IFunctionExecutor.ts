export interface IFunctionExecutor {
  injectScript(scriptContent: string): void;
  executeFunction(functionName: string, args?: any): void;
}