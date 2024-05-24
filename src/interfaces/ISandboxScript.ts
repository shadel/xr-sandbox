export interface ISandboxScript {
  getName(): string;
  getId(): string;
  getComment(): string;
  getConsole(): string;
  code(): string;
}
