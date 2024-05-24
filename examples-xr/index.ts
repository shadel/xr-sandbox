import { IdElemenetSelector } from "../src/IdElementSelector";
import { SanboxElement } from "../src/SanboxElement";
import PageSandbox from "../src/PageSandbox";

const containerElement = document.getElementById("container")!;
const sandboxUrl = "./SystemAnimatorOnline/XR_Animator_improve.html";
const pageSandbox = new PageSandbox(
  containerElement,
  sandboxUrl,
);

const sandboxStartButton = new SanboxElement(pageSandbox, new IdElemenetSelector("LMMD_StartButton"));

const drawBlueRectButton = document.getElementById("drawBlueRect")!;
drawBlueRectButton.addEventListener("click", () => {
  console.log("click");
  sandboxStartButton.click();
});

if (import.meta.hot) {
  import.meta.hot.accept();
}
