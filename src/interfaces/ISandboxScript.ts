export interface ISandboxScript {
  getName(): string;
  getId(): string;
  getString(): string;
  getComment(): string;
  getConsole(): string;
}
