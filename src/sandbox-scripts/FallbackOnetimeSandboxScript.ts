import { ISandboxScript } from "../interfaces/ISandboxScript";
import { EventcaptureOnetimeSandboxScript } from "./EventcaptureOnetimeSandboxScript";
import { SandboxScript } from "./SandboxScript";

export enum FallbackType {
  CHECK,
  VOID,
  VALUE,
}

function fallbackCheck(id: string, code: string) {
  return `
  const element = ${code}
  console.log({element});
    if (!element) {
      return false;
    }
    return {eventType: '${id}'}
  `;
}

function fallbackVoid(id: string, code: string) {
  return `
    ${code}
    return {eventType: '${id}'}
  `;
}

function fallbackValue(id: string, code: string) {
  return `
    const element = ${code}
    return {eventType: '${id}', data: element}
  `;
}

export class FallbackOnetimeSandboxScript extends SandboxScript {
  private script: ISandboxScript;
  constructor({
    id,
    script,
    type,
  }: {
    id?: string;
    script: ISandboxScript;
    type: FallbackType;
  }) {
    super(id);
    this.script = new EventcaptureOnetimeSandboxScript({
      checker: this.getFallback(type)(this.getId(), script.code()),
    });
  }

  getFallback(type: FallbackType) {
    switch (type) {
      case FallbackType.CHECK:
        return fallbackCheck;
      case FallbackType.VALUE:
        return fallbackValue;
    }
    return fallbackVoid;
  }
  getName(): string {
    return "FallbackOnetimeSandboxScript";
  }
  getString(): string {
    return this.script.code();
  }
}
