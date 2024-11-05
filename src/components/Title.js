import VirtualDOM from "../utils/VirtualDOM.js";

const Title = () => {
  return VirtualDOM.createElement("h1", {}, "제목입니다");
};

export default Title;
