import { ISandboxScript } from "../interfaces/ISandboxScript";

function block(code: string) {
  return `(() => {
    ${code}
  })()`;
}

export abstract class SandboxScript implements ISandboxScript {
  private _id: string;
  constructor(id?: string) {
    this._id = id || Date.now().toString();
  }
  code(): string {
    return block(this.getString());
  }
  getComment(): string {
    return `// ${this.getId()}`;
  }
  getConsole(): string {
    return `console.log("${this.getId()}");`;
  }
  abstract getName(): string;
  protected abstract getString(): string;
  getId(): string {
    return `${this.getName()}_${this._id}`;
  }
}
