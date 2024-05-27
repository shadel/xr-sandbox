import { ISanboxElementSelector } from "../interfaces/ISanboxElementSelector";
import { SelectorDocumentSandboxScript } from "../sandbox-scripts/SelectorDocumentSandboxScript";

export class DocumentSelector implements ISanboxElementSelector {
  getName(): string {
    return `Selector by Document`;
  }
  getScript() {
    return new SelectorDocumentSandboxScript();
  }
}
