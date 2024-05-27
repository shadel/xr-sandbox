import { ISanboxElementSelector } from "../interfaces/ISanboxElementSelector";
import { SelectorWindowSandboxScript } from "../sandbox-scripts/SelectorWindowSandboxScript";

export class WindowSelector implements ISanboxElementSelector {
  getName(): string {
    return `Selector by Window`;
  }
  getScript() {
    return new SelectorWindowSandboxScript();
  }
}
