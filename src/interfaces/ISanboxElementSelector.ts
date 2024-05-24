import { ISandboxScript } from "./ISandboxScript";

export interface ISanboxElementSelector {
  getName(): string;
  getScript(): ISandboxScript;
}
