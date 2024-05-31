import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class ElementExecuteSandboxScript extends SandboxScript {
  constructor(
    private selectorScript: ISandboxScript,
    private options: { command: string; args: any[] },
    id?: string
  ) {
    super(id);
  }
  getName(): string {
    return "ElementExecuteSandboxScript";
  }
  args() {
    return this.options;
  }
  getChilds(): ISandboxScript[] {
    return [this.selectorScript];
  }
  getString(): string {
    return `
      const element = ${this.selectorScript.code()}
      const {command, args: commandArgs} = ${this.argsCode()}
      console.log("executeCommand", command, element, commandArgs);
      return element[command](...commandArgs);
        `;
  }
}
