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
  getName(): string {
    return "SandboxScriptBlock";
  }
  add(script: ISandboxScript): void {
    this.scripts.push(script);
  }
  getString(): string {
    return `(function() {
            ${this.getComment()}
            ${this.getConsole()}
            ${this.scripts.map((script) => script.getString()).join("\n")}
        })()`;
  }
}
