class VirtualDOM {
  constructor() {
    this.root = null;
  }

  //** 가상 노드 생성 */
  createElement(tagName, props) {
    return { tagName, props };
  }

  //** 가상 노드를 실제 DOM에 반영 */
  render(vNode, container) {
    const element = this._createElement(vNode);
    this.root = element;
    container.appendChild(element);
  }

  //** 가상 노드를 실제 노드로 변경 */
  _createElement(vNode) {
    if (typeof vNode === "string") {
      return document.createTextNode(vNode);
    }

    const element = document.createElement(vNode.tagName);

    Object.keys(vNode.props).forEach((key) => {
      element[key] = vNode.props[key];
    });

    return element;
  }
}

export default VirtualDOM;
