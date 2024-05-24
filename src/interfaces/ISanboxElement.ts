export interface ISanboxElement {
  click(): void;
  exist(timeout?: number): Promise<void>;
}
