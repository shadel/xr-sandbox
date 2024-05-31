import { ISandboxScript } from "./ISandboxScript";

export interface ISanboxElement {
  click(): Promise<void>;
  dispatchEvent(event: ISandboxScript, timeout?: number): Promise<void>;
  exist(timeout?: number): Promise<void>;
  executeCommand(command: string, args: any[], timeout?: number): Promise<any>;
}
