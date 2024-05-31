import { IdElemenetSelector } from "../src/selectors/IdElementSelector";
import { QuerySelector } from "../src/selectors/QuerySelector";
import { SanboxElement } from "../src/SanboxElement";
import PageSandbox from "../src/PageSandbox";
import {Flow} from "../src/Flow";
import { SA_DragDropEMUUrl } from "./scripts/SA_DragDropEMU";

async function loadVRM(containerElement: HTMLElement, modelPath: string, filename: string) {
  const sandboxUrl = "./SystemAnimatorOnline/XR_Animator_improve.html";
  
  const pageSandbox = new PageSandbox({
    documentElement: containerElement,
    sandboxUrl,
  });
  
  const sandboxStartButton = new SanboxElement(pageSandbox, new IdElemenetSelector("LMMD_StartButton"));


  const flow = new Flow();

  await flow.waitElementExist(sandboxStartButton);

  const script = await SA_DragDropEMUUrl(modelPath, filename);
  const bodyButton = new SanboxElement(pageSandbox, new QuerySelector("body"));
    
  await flow.waitDispatch(bodyButton, script);

  console.log("show char")
  sandboxStartButton.click();
  
  const dungEventory = new SanboxElement(pageSandbox, new IdElemenetSelector("Ldungeon_inventory"));

  await flow.waitElementExist(dungEventory);
  console.log("dung Exist")
  await flow.waitElementExecute(dungEventory, {command: "setAttribute", args: ['hidden', true]});
}

const models = [`${location.href}data/vrms/khunglongxiu.vrm`, `${location.href}data/mmds/firefly_03.zip`, `${location.href}data/mmds/Star Rail - Bronya.zip`];

const createModelLoader = (containerElement: HTMLElement) => async (modelPath: string) => {
  
  const fifilename = modelPath.split("/").pop() || "";
  await loadVRM(containerElement, modelPath, fifilename);
}

async function runner() {

  const containerElement = document.getElementById("container")!;
  const modelLoader = createModelLoader(containerElement);

  await modelLoader(models[0]);

  ["changeModel1", "changeModel2", "changeModel3"].forEach((id, idx) => {
    const button = document.getElementById(id)!;
    button.addEventListener("click", async () => {
      await modelLoader(models[idx]);
    });
  })
}
  
runner().then(() => console.log("Run sucess")).catch(error => {
  console.error(error)
})

if (import.meta.hot) {
  import.meta.hot.accept();
}
