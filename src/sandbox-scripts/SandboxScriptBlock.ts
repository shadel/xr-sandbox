import { ISandboxScript } from "../interfaces/ISandboxScript";
import { ISandboxScriptBlock } from "../interfaces/ISandboxScriptBlock";
import { SandboxScript } from "./SandboxScript";

function block(code: string, id: string) {
  return `(async () => {
    ${code}
  })().then(() => console.log("${id}"))`;
}

export class SandboxScriptBlock
  extends SandboxScript
  implements ISandboxScriptBlock
{
  private scripts: ISandboxScript[] = [];
  constructor(id?: string) {
    super(id);
  }
  injectCode(): string {
    return block(this.getString(), this.getId());
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
