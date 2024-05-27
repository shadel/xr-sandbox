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
}
async function runner() {

  const containerElement = document.getElementById("container")!;
  
  const modelPath = `${location.href}data/vrms/khunglongxiu.vrm`;
  const fifilename = modelPath.split("/").pop() || "";
  await loadVRM(containerElement, modelPath, fifilename);
  
  const drawBlueRectButton = document.getElementById("drawBlueRect")!;
  drawBlueRectButton.addEventListener("click", async () => {
    console.log("click");
    const modelPath = `${location.href}data/mmds/firefly_03.zip`;
    const fifilename = modelPath.split("/").pop() || "";
    await loadVRM(containerElement, modelPath, fifilename);
  });
}
  
runner().then(() => console.log("Run sucess")).catch(error => {
  console.error(error)
})

if (import.meta.hot) {
  import.meta.hot.accept();
}
