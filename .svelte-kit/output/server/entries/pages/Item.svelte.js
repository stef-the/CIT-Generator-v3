import { c as create_ssr_component, a as each, e as escape, b as add_attribute } from "../../chunks/index-7340f048.js";
const Item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const inputs = [
    {
      name: "iname",
      title: "Internal Name",
      placeholder: "END_SWORD"
    },
    {
      name: "txname",
      title: "Texture Name",
      placeholder: "texture.png"
    },
    {
      name: "fname",
      title: "File Name",
      placeholder: "texture.properties"
    }
  ];
  let out = { displayname: "" };
  return `<main><h1 class="${"box-inner"}"><a class="${"linkto"}" href="${"/"}">Item CIT Generator</a></h1>
	<div class="${"linebreak"}"></div>
	<form autocomplete="${"off"}"><div class="${"labelcontainer"}">${each(inputs, (item) => {
    return `<div class="${"labelgroup"}"><label${add_attribute("for", item.name, 0)}>${escape(item.title)}</label>
					<div class="${"linebreak"}"></div>
					<input class="${"text"}" type="${"text"}"${add_attribute("name", item.name, 0)}${add_attribute("id", item.name, 0)}${add_attribute("placeholder", item.placeholder, 0)}><br>
				</div>`;
  })}</div>
		<div class="${"linebreak"}"></div>
		<div class="${"labelgroup submit"}"><input class="${"submit"}" type="${"button"}" name="${"submit"}" value="${"Submit"}"></div>
		<p>${escape(out.displayname)}</p></form></main>`;
});
export { Item as default };
