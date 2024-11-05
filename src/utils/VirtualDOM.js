class VirtualDOM {
  constructor() {
    this.root = null;
  }

  //** 가상 노드 생성 */
  createVirtualElement(tagName, props) {
    return { tagName, props };
  }

  //** 가상 노드를 실제 DOM에 반영 */
  render(node, container) {
    const element = this.createRealElement(node);
    this.root = element;
    container.appendChild(element);
  }

  createRealElement(node) {
    if (typeof node === "string") {
      return document.createTextNode(node);
    }

    const element = document.createElement(node.tagName);

    Object.keys(node.props).forEach((key) => {
      element[key] = node.props[key];
    });

    return element;
  }
}

export default VirtualDOM;
