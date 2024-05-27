import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class EventDropFileCreateSandboxScript extends SandboxScript {
  constructor(private fileurl: string, private filename: string) {
    super();
  }
  getName(): string {
    return "EventDropFileCreateSandboxScript";
  }
  args() {
    return { fileurl: this.fileurl, filename: this.filename };
  }
  getString(): string {
    return `
      
      console.log(${this.argsCode()});
      const {fileurl, filename} = ${this.argsCode()}
      const blob = await fetch(fileurl).then( res => res.blob());

      const file = new File([blob], filename)
      
      function FakeDataTransfer(file) {
        this.dropEffect = 'all';
        this.effectAllowed = 'all';
        this.items = [];
        this.types = ['Files'];
        this.getData = function() {
      
          return file;
        };
        this.files = [file];
      };
      return new FakeDataTransfer(file);
    `;
  }
}
