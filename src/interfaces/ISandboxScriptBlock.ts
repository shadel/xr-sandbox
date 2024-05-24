import { ISandboxScript } from "./ISandboxScript";

export interface ISandboxScriptBlock extends ISandboxScript {
  add(script: ISandboxScript): void;
}
