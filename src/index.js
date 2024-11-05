import Body from "./components/Body.js";
import Title from "./components/Title.js";
import VirtualDOM from "./utils/VirtualDOM.js";

const root = document.getElementById("root");

const node = VirtualDOM.createElement("div", { id: "app" }, Title(), Body());

VirtualDOM.render(node, root);
