import { ISanboxElement } from "./interfaces/ISanboxElement";

export class Flow {
  async waitElementExist(element: ISanboxElement, timeout?: number) {
    return element.exist(timeout);
  }
}
