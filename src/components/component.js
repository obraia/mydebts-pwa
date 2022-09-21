class Component {
  /**
   * 
   * @param {{
   *  tag: keyof HTMLElementTagNameMap;
   *  parent: HTMLElement;
   *  id?: string;
   *  className?: string;
   *  classList?: string[];
   *  style?: Partial<CSSStyleDeclaration>;
   *  attributes?: Record<string, string>;
   *  events?: Record<string, (event: Event) => void>;
   *  children?: HTMLElement[];
   *  innerHTML?: string;
   *  innerText?: string;
   * }} params 
   * @returns 
   */
  createElement(params) {
    const element = document.createElement(params.tag);

    if (params.name) {
      const className = params.className || this._getClass(params.parent, params.name);
      element.classList.add(className);
    }

    if (params.id) {
      element.id = params.id;
    }

    if (params.classList) {
      element.classList.add(...params.classList);
    }

    if (params.style) {
      for (const key in params.style) {
        element.style[key] = params.style[key];
      }
    }

    if (params.attributes) {
      for (const key in params.attributes) {
        element.setAttribute(key, params.attributes[key]);
      }
    }

    if (params.events) {
      for (const key in params.events) {
        element.addEventListener(key, params.events[key]);
      }
    }

    if (params.children) {
      params.children.forEach(child => { if(child)element.appendChild(child) });
    }

    if (params.innerHTML) {
      element.innerHTML = params.innerHTML;
    }

    if (params.innerText) {
      element.innerText = params.innerText;
    }

    return element;
  }

  /**
   * 
   * @param { HTMLElement } parent 
   * @param { string } name 
   * @returns 
   */
  _getClass(parent, name) {
    return parent ? `${parent.classList[0]}__${name}` : name;
  }

  /**
   * 
   * @param { HTMLElement } parent 
   * @param { string } name 
   * @returns 
   */
  _getId(parent, name) {
    return parent && parent.id ? `${parent.id}__${name}` : name;
  }
}

export { Component };
