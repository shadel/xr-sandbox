import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class SelectorByIdSandboxScript extends SandboxScript {
  constructor(private selector: string, id?: string) {
    super(id);
  }
  getName(): string {
    return "SelectorByIdSandboxScript";
  }
  getString(): string {
    return `
        return document.getElementById("${this.selector}");
        `;
  }
}
