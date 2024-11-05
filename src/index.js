import Body from "./components/Body.js";
import Title from "./components/Title.js";
import VirtualDOM from "./utils/VirtualDOM.js";

const root = document.getElementById("root");

const title = Title();
const body = Body();

root.appendChild(title);
root.appendChild(body);

const virtualDOM = new VirtualDOM();

const node = virtualDOM.createElement("div", { id: "app" });

virtualDOM.render(node, root);
