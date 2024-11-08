class VirtualDOM {
  constructor() {
    if (!VirtualDOM.instance) {
      this.root = null;
      this._virtualDOM = null;
      VirtualDOM.instance = this;
    }
    return VirtualDOM.instance;
  }

  //** 가상 노드 생성 */
  createElement(tagName, props = {}, ...children) {
    return { tagName, props, children };
  }

  //** 가상 노드를 실제 DOM에 반영 */
  render(newVNode, container) {
    if (this._virtualDOM) {
      this._diff(this._virtualDOM, newVNode, container);
    } else {
      const element = this._createElement(newVNode);
      container.innerHTML = "";
      container.appendChild(element);
    }

    this._virtualDOM = newVNode;
    this.root = container.firstChild;
  }

  //** 기존 가상노드와 새로운 가상노드 비교하여 업데이트 결정 */
  _diff(oldVNode, newVNode, parent = this.root) {
    if (!oldVNode) {
      const newElement = this._createElement(newVNode);
      parent.appendChild(newElement);
      return newElement;
    }

    if (!newVNode) {
      parent.removeChild(parent.childNodes[0]);
      return null;
    }

    if (typeof oldVNode === "string" && typeof newVNode === "string") {
      if (oldVNode !== newVNode) {
        const newText = document.createTextNode(newVNode);
        parent.replaceChild(newText, parent);
        return newText;
      }
      return null;
    }

    if (
      typeof oldVNode !== typeof newVNode ||
      oldVNode.tagName !== newVNode.tagName
    ) {
      const newElement = this._createElement(newVNode);
      parent.replaceChild(newElement, parent.childNodes[0]);
      return newElement;
    }

    this._updateElementProps(
      parent.childNodes[0],
      oldVNode.props,
      newVNode.props
    );

    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    const maxLength = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLength; i++) {
      console.log(parent, "ii");
      const parentChildNodes = Array.from(parent.children);
      const element = parentChildNodes[i];
      if (newChildren[i] === undefined) {
        if (element) {
          parent.removeChild(element);
        }
      } else if (element) {
        const updatedElement = this._diff(
          oldChildren[i],
          newChildren[i],
          element
        );
        console.log(updatedElement, "updatedElement");
        if (updatedElement && updatedElement !== element) {
          parent.replaceChild(updatedElement, element);
        }
      } else {
        const newElement = this._createElement(newChildren[i]);
        parent.appendChild(newElement);
        console.log(newElement, "d");
      }
    }

    return parent;
  }

  //** 기존과 다른 속성 업데이트 */
  _updateElementProps(element, oldVNodeProps, newVNodeProps) {
    const newVNodePropsKeys = Object.keys(newVNodeProps);

    Object.keys(oldVNodeProps).forEach((key) => {
      if (key === "id") {
        return;
      }

      if (!newVNodePropsKeys.includes(key)) {
        if (key.startsWith("on")) {
          const eventType = key.substring(2).toLowerCase();
          element.removeEventListener(eventType, oldVNodeProps[key]);
        } else {
          element[key] = null;
        }
      }
    });

    newVNodePropsKeys.forEach((key) => {
      if (key.startsWith("on")) {
        const eventType = key.substring(2).toLowerCase();
        element.removeEventListener(eventType, oldVNodeProps[key]);
        element.addEventListener(eventType, newVNodeProps[key]);
      } else {
        element[key] = newVNodeProps[key];
      }
    });
  }

  //** 가상 노드를 실제 노드로 변경 */
  _createElement(vNode) {
    if (!vNode) return null;
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
