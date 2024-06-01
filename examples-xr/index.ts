import { IdElemenetSelector } from "../src/selectors/IdElementSelector";
import { QuerySelector } from "../src/selectors/QuerySelector";
import { SanboxElement } from "../src/SanboxElement";
import PageSandbox from "../src/PageSandbox";
import { Flow } from "../src/Flow";
import { SA_DragDropEMUUrl } from "./scripts/SA_DragDropEMU";
import { createCheckFaceMeshLoaded, createRunEvent } from "./scripts/MMD_SA_options";
import { FallbackType } from "../src/sandbox-scripts/FallbackOnetimeSandboxScript";
import { replaceDEBUG_show } from "./scripts/DEBUG_show";

async function loadVRM(
  containerElement: HTMLElement,
  modelPath: string,
  filename: string
) {
  const sandboxUrl = "./SystemAnimatorOnline/XR_Animator_improve.html";

  const pageSandbox = new PageSandbox({
    documentElement: containerElement,
    sandboxUrl,
  });

  const sandboxStartButton = new SanboxElement(
    pageSandbox,
    new IdElemenetSelector("LMMD_StartButton")
  );
  const flow = new Flow();

  const debugScript = replaceDEBUG_show();
  await flow.waitScriptRun(pageSandbox, debugScript);


  await flow.waitElementExist(sandboxStartButton);

  const script = await SA_DragDropEMUUrl(modelPath, filename);
  const bodyButton = new SanboxElement(pageSandbox, new QuerySelector("body"));

  await flow.waitDispatch(bodyButton, script);

  console.log("show char");
  sandboxStartButton.click();

  const dungEventory = new SanboxElement(
    pageSandbox,
    new IdElemenetSelector("Ldungeon_inventory")
  );

  await flow.waitElementExist(dungEventory);
  console.log("dung Exist");
  // await flow.waitElementExecute(dungEventory, {
  //   command: "setAttribute",
  //   args: ["hidden", true],
  // });
  const checkFacemeshScript = createCheckFaceMeshLoaded();
  await flow.waitScriptRun(pageSandbox, checkFacemeshScript, {type: FallbackType.CHECK});

  const sceneScript = createRunEvent(3);
  await flow.waitScriptRun(pageSandbox, sceneScript);

  
  const loadSceneScript = await SA_DragDropEMUUrl(`${location.href}data/scenes/vr_apartment.zip`, "scene_classroom.zip");
  await flow.waitDispatch(bodyButton, loadSceneScript);

  return pageSandbox;
}

const models = [
  `${location.href}data/vrms/khunglongxiu.vrm`,
  `${location.href}data/mmds/firefly_03.zip`,
  `${location.href}data/mmds/Star Rail - Bronya.zip`,
];
const defaultModelIdx = 0;

const createModelLoader =
  (containerElement: HTMLElement) => async (modelPath: string) => {
    const fifilename = modelPath.split("/").pop() || "";
    return await loadVRM(containerElement, modelPath, fifilename);
  };

async function runner() {
  const containerElement = document.getElementById("container")!;
  const modelLoader = createModelLoader(containerElement);

  let page = await modelLoader(models[defaultModelIdx]);

  ["changeModel1", "changeModel2", "changeModel3"].forEach((id, idx) => {
    const button = document.getElementById(id)!;
    button.addEventListener("click", async () => {
      page = await modelLoader(models[idx]);
    });
  });

  const button = document.getElementById("event1")!;
  button.addEventListener("click", async () => {
    const flow = new Flow();
    const script = createRunEvent(3);
    await flow.waitScriptRun(page, script);
    const loadSceneScript = await SA_DragDropEMUUrl(`${location.href}data/scenes/vr_apartment.zip`, "vr_apartment.zip");
    const bodyButton = new SanboxElement(page, new QuerySelector("body"));
    await flow.waitDispatch(bodyButton, loadSceneScript);
  
  });
}

runner()
  .then(() => console.log("Run sucess"))
  .catch((error) => {
    console.error(error);
  });

if (import.meta.hot) {
  import.meta.hot.accept();
}
