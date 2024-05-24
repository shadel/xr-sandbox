export interface ISanboxElement {
  click(): Promise<void>;
  exist(timeout?: number): Promise<void>;
}
