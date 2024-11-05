class VirtualDOM {
  constructor() {
    if (!VirtualDOM.instance) {
      this.root = null;
      VirtualDOM.instance = this;
    }
    return VirtualDOM.instance;
  }

  //** 가상 노드 생성 */
  createElement(tagName, props = {}, ...children) {
    return { tagName, props, children };
  }

  //** 가상 노드를 실제 DOM에 반영 */
  render(vNode, container) {
    const element = this._createElement(vNode);
    this.root = element;
    container.innerHTML = "";
    container.appendChild(element);
  }

  //** 가상 노드를 실제 노드로 변경 */
  _createElement(vNode) {
    if (typeof vNode === "string") {
      return document.createTextNode(vNode);
    }

    const element = document.createElement(vNode.tagName);

    Object.keys(vNode.props).forEach((key) => {
      if (key.startsWith("on")) {
        const eventType = key.substring(2).toLowerCase();
        element.addEventListener(eventType, vNode.props[key]);
      } else {
        element[key] = vNode.props[key];
      }
    });

    if (vNode.children) {
      vNode.children.forEach((child) => {
        const childElement = this._createElement(child);
        element.appendChild(childElement);
      });
    }

    return element;
  }
}

const instance = new VirtualDOM();

export default instance;
