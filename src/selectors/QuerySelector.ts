import { ISanboxElementSelector } from "../interfaces/ISanboxElementSelector";
import { SelectorQuerySandboxScript } from "../sandbox-scripts/SelectorQuerySandboxScript";

export class QuerySelector implements ISanboxElementSelector {
  query: string;
  constructor(query: string) {
    this.query = query;
  }
  getName(): string {
    return `Selector by query: ${this.query}`;
  }
  getScript() {
    return new SelectorQuerySandboxScript(this.query);
  }
}
