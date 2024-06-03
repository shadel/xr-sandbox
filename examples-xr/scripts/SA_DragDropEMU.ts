import { SimpleSandboxScript } from "../../src/sandbox-scripts/SimpleSandboxScript";
import { EventDropCreateSandboxScript } from "../../src/sandbox-scripts/EventDropCreateSandboxScript";
import { EventDropFileCreateSandboxScript } from "../../src/sandbox-scripts/EventDropFileCreateSandboxScript";
import axios from "axios";
import { downloadZip } from "client-zip";

export function SA_DragDropEMU(fileUrl: string) {
  return new SimpleSandboxScript(`SA_DragDropEMU("${fileUrl}")`);
}

async function url2blob(fileUrl: string) {
  const res = await axios({
    url: fileUrl,
    method: "GET",
    responseType: "blob", // Important
  });
  const file = res.data;
  return file;
}
function FakeDataTransfer(file: any) {
  this.dropEffect = "all";
  this.effectAllowed = "all";
  this.items = [];
  this.types = ["Files"];
  this.getData = function () {
    return file;
  };
  this.files = [file];
}
export async function SA_DragDropEMUUrl(fileUrl: string, filename: string) {
  // const fileblob = await url2blob(fileUrl);
  // const bloburl = URL.createObjectURL(fileblob)
  // const dataTranser = new FakeDataTransfer(fileblob);

  return new EventDropCreateSandboxScript(
    new EventDropFileCreateSandboxScript(fileUrl, filename)
  );
}

export async function SA_DragDropEMUUrls(
  fileUrls: Array<{ filename: string; url: string }>
) {
  const fileblob = await downloadZip(
    await Promise.all(
      fileUrls.map(async (item) => ({
        name: item.filename,
        input: await fetch(item.url),
      }))
    )
  ).blob();
  const bloburl = URL.createObjectURL(fileblob);
  // const link = document.createElement("a")
  // link.href = URL.createObjectURL(fileblob)
  // link.download = "test.zip"
  // link.click()
  // link.remove()
  return SA_DragDropEMUUrl(bloburl, "urls.zip");
}

function get3DObjects(rootpath: string, sceneJson: any) {
  const files = sceneJson.XR_Animator_scene.object3D_list
    .map((item) => {
      return [
        {
          filename: `${item.path}.zip`,
          url: `${rootpath}/${item.path}.zip`,
        },
        {
          filename: `${item.path}.glb`,
          url: `${rootpath}/${item.path}.glb`,
        },
      ];
    })
    .flat();

  return files;
}

export async function SA_DragDropSceneJSON(fileUrl: string) {
  const rootpath = fileUrl
    .split("/")
    .filter((item, idx, arr) => idx < arr.length - 1)
    .join("/");

  const sceneFile = await (await fetch(fileUrl)).json();
  const files = get3DObjects(rootpath, sceneFile);

  // const sceneMeta = {name: "scene.json", input: JSON.stringify(sceneFile)};

  // const fileblob = await url2blob(fileUrl);
  // const bloburl = URL.createObjectURL(fileblob)
  // const dataTranser = new FakeDataTransfer(fileblob);

  return SA_DragDropEMUUrls([
    ...files,
    { filename: "scene.json", url: fileUrl },
  ]);
}

export async function SA_DragDropSceneJSONData(
  rootpath: string,
  sceneJSON: any
) {
  const sceneFile = sceneJSON;
  const files = get3DObjects(rootpath, sceneFile);

  var sceneblob = new Blob([JSON.stringify(sceneFile)], {
    type: "text/plain",
  });

  const bloburl = URL.createObjectURL(sceneblob);

  return SA_DragDropEMUUrls([
    ...files,
    { filename: "scene.json", url: bloburl },
  ]);
}
