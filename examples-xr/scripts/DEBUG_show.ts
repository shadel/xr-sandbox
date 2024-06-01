import { SimpleSandboxScript } from "../../src/sandbox-scripts/SimpleSandboxScript";

export function replaceDEBUG_show() {
    return new SimpleSandboxScript(`
        DEBUG_show = (...dargs) => console.warn(...dargs)
    `);
}