import { SimpleSandboxScript } from "../../src/sandbox-scripts/SimpleSandboxScript";
import { EventDropCreateSandboxScript } from "../../src/sandbox-scripts/EventDropCreateSandboxScript";
import { EventDropFileCreateSandboxScript } from "../../src/sandbox-scripts/EventDropFileCreateSandboxScript";
import axios from "axios";

export function SA_DragDropEMU(fileUrl: string) {
    return new SimpleSandboxScript(`SA_DragDropEMU("${fileUrl}")`);
}

async function url2blob(fileUrl: string) {
    const res = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'blob', // Important
      });
    const file = res.data;
}
function FakeDataTransfer(file: any) {
    this.dropEffect = 'all';
    this.effectAllowed = 'all';
    this.items = [];
    this.types = ['Files'];
    this.getData = function() {
  
      return file;
    };
    this.files = [file];
  };
export async function SA_DragDropEMUUrl(fileUrl: string, filename: string) {

    // const fileblob = await url2blob(fileUrl);
    // const dataTranser = new FakeDataTransfer(fileblob);


    return new EventDropCreateSandboxScript(new EventDropFileCreateSandboxScript(fileUrl, filename));
}