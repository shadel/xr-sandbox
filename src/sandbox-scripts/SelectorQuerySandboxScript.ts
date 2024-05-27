import { SandboxScript } from "./SandboxScript";

export class SelectorQuerySandboxScript extends SandboxScript {
  constructor(private selector: string, id?: string) {
    super(id);
  }
  getName(): string {
    return "SelectorQuerySandboxScript";
  }
  getString(): string {
    return `
        return document.querySelector("${this.selector}");
        `;
  }
}
