import { ISandboxScript } from "./interfaces/ISandboxScript";
import { ISandboxScriptBlock } from "./interfaces/ISandboxScriptBlock";
import { SandboxScript } from "./sandbox-scripts/SandboxScript";

export class SandboxScriptBlock
  extends SandboxScript
  implements ISandboxScriptBlock
{
  private scripts: ISandboxScript[] = [];
  constructor(id?: string) {
    super(id);
  }
  injectCode(): string {
    return this.code();
  }
  getName(): string {
    return "SandboxScriptBlock";
  }
  add(script: ISandboxScript): void {
    this.scripts.push(script);
  }
  getChilds(): ISandboxScript[] {
    return this.scripts;
  }
  getString(): string {
    return `
        ${this.getComment()}
        ${this.getConsole()}
        ${this.scripts.map((script) => script.code()).join("\n")}
    `;
  }
}
