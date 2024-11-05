import Body from "./components/Body.js";
import Title from "./components/Title.js";

const root = document.getElementById("root");

const title = Title();
const body = Body();

root.appendChild(title);
root.appendChild(body);
