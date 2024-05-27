import { ISandboxScript } from "./ISandboxScript";

export interface ISanboxElement {
  click(): Promise<void>;
  dispatchEvent(event: ISandboxScript): Promise<void>;
  exist(timeout?: number): Promise<void>;
}
