import { ISandboxScript } from "../interfaces/ISandboxScript";

function argCode(id: string) {
  return `(args||{})["${id}"]`;
}

function block(code: string, id: string) {
  return `(() => {
    ${code}
  })()`;
}

export abstract class SandboxScript implements ISandboxScript {
  private _id: string;
  constructor(id?: string) {
    this._id = id || Date.now().toString();
  }
  sandboxArgs(): { [key: string]: any } {
    return this.getChilds()
      .map((node) => node.sandboxArgs())
      .reduce((res, obj) => ({ ...res, ...obj }), {
        [this.getId()]: this.args(),
      });
  }
  getChilds(): ISandboxScript[] {
    return [];
  }
  argsCode(): string {
    return argCode(this.getId());
  }
  args(): any {
    return null;
  }
  code(): string {
    return block(this.getString(), this.getId());
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
