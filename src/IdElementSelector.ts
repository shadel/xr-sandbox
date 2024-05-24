import { ISanboxElementSelector } from "./interfaces/ISanboxElementSelector";
import { SelectorByIdSandboxScript } from "./sandbox-scripts/SelectorByIdSandboxScript";

export class IdElemenetSelector implements ISanboxElementSelector {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  getScript() {
    return new SelectorByIdSandboxScript(this.id);
  }
}
