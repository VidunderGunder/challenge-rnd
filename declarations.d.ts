import { PrismaClient } from "@prisma/client";
import { css as styledComponentsCssHelper } from "styled-components";
import { CSSProp } from "styled-components";

declare global {
  /**
   * Global helper function to supply styled-componenents CSS-types to a [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
   *
   * Not to be confused with from `styled-jsx/css` or `@emotion/react`.
   *
   * ## Examples:
   *
   * With prop:
   *
   * ```tsx
   * <div
   *   css={css`
   *     color: pink;
   *   `}
   * />
   * ```
   *
   * For standalone CSS:
   *
   * ```tsx
   * const someCSS = css`
   *  color: pink;
   * `;
   * ```
   *
   * The function only supplies types, does nothing, and is strictly not needed, so the following would also work:
   *
   * ```tsx
   * <div
   *   css={`
   *     color: pink;
   *   `}
   * />
   * ```
   *
   * For standalone CSS:
   *
   * ```tsx
   * const someCSS = `
   *  color: pink;
   * `;
   * ```
   *
   * ...but with no type safety and a worse developer experience.
   *
   * ## Motivation:
   *
   * With a global helper function, we will...
   *
   * - ...avoid having to import `css` from `styled-components` for every file
   * - ...avoid confusion between `css` from `styled-components`, `@emotion/react` and `styled-jsx/css`
   */
  // eslint-disable-next-line no-var
  // var css: typeof styledComponentsCssHelper | undefined;

  namespace JSX {
    interface IntrinsicAttributes {
      /**
       * [styled-components](https://styled-components.com/) `css`-prop implemented with plugins for SWC for Next.js and Babel for Storybook (before SWC support is implemented).
       *
       * Based on [Emotion's `css`-prop](https://emotion.sh/docs/css-prop), and while the `css`-prop from styled-components isn't documented properly, it is so similar that [Emotion recommends using styled-components' Babel plugin](https://styled-components.com/#installation) for better tooling with their implementation.
       */
      css?: CSSProp;
    }
  }
}

declare module "react" {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
