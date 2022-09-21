import { Component } from "../component.js";

class IDebt {
  icon = String();
  title = String();
  date = new Date();
  value = Number();
}

class IParams extends IDebt {
  parent = new HTMLElement();
}

class Debt extends Component {
  /**
   * 
   * @param { IParams } params 
   */
  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  /**
   * 
   * @param { IParams } params 
   */
  _create(params) {
    const debt = super.createElement({
      tag: "li",
      name: "item",
      parent: params.parent,
    });

    const type = super.createElement({
      tag: "div",
      name: "type",
      parent: debt,
      children: [
        super.createElement({
          tag: "i",
          classList: params.type.split(" "),
        }),
      ],
    });

    const title = super.createElement({
      tag: "div",
      name: "title",
      parent: debt,
      innerText: params.title,
    });

    const date = super.createElement({
      tag: "div",
      name: "date",
      parent: debt,
      innerText: params.date.toLocaleDateString(),
    });

    const value = super.createElement({
      tag: "div",
      name: "value",
      parent: debt,
      innerText: params.value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    });

    debt.append(type, title, date, value);
    
    return debt;
  }
}

export { Debt, IDebt };