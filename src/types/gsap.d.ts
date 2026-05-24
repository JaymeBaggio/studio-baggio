declare module "gsap/SplitText" {
  export type SplitTextVars = Record<string, unknown>;
  export class SplitText {
    constructor(target: Element | Element[] | string, vars?: SplitTextVars);
    words: Element[];
    lines: Element[];
    revert(): void;
  }
  export default SplitText;
}
