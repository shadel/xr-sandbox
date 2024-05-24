import { ISandboxScript } from "../interfaces/ISandboxScript";

export abstract class SandboxScript implements ISandboxScript {
  private _id: string;
  constructor(id?: string) {
    this._id = id || Date.now().toString();
  }
  getComment(): string {
    return `// ${this.getId()}`;
  }
  getConsole(): string {
    return `console.log("${this.getId()}")`;
  }
  abstract getName(): string;
  abstract getString(): string;
  getId(): string {
    return `${this.getName()}_${this._id}`;
  }
}
