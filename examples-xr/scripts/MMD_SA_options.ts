import { SimpleSandboxScript } from "../../src/sandbox-scripts/SimpleSandboxScript";

export enum MMD_SA_EVENT_ID {
    START_SCENE_EDIT = 3
}

export function createCheckFaceMeshLoaded() {
    return new SimpleSandboxScript(`
        try {
            const fml = MMD_SA_options.Dungeon_options.events_default._FACEMESH_OPTIONS_.length;
            console.log({fml})
            return fml > 0;
        } catch(e) {
            return false;
        }
    `)
}

export function createRunEvent(id: MMD_SA_EVENT_ID) {
    return new SimpleSandboxScript(`
        console.log("SimpleSandboxScript createRunEvent, ${id}", MMD_SA_options.Dungeon);
        MMD_SA_options.Dungeon.run_event("_FACEMESH_OPTIONS_", ${id});
    `)
}