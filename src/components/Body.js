import Title from "./Title.js";
import VirtualDOM from "../utils/VirtualDOM.js";

const Body = () => {
  let count = 0;

  const handleClick = () => {
    count += 1;
    update();
  };

  const createBodyNode = () => {
    return VirtualDOM.createElement(
      "div",
      {},
      VirtualDOM.createElement("div", {}, `현재 카운트: ${count}`),
      VirtualDOM.createElement(
        "button",
        { onClick: handleClick },
        "1을 증가합니다"
      )
    );
  };

  const update = () => {
    const newNode = VirtualDOM.createElement(
      "div",
      {},
      Title(),
      createBodyNode()
    );

    VirtualDOM.render(newNode, root);
  };

  update();
};

export default Body;
