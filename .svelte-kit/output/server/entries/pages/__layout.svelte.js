import { c as create_ssr_component } from "../../chunks/index-7340f048.js";
var __layout_svelte_svelte_type_style_lang = "";
const css = { code: '@import "../css/";', map: null };
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<nav></nav>
<main>${slots.default ? slots.default({}) : ``}</main>

<footer><p>Created by stef#6470</p></footer>`;
});
export { _layout as default };
