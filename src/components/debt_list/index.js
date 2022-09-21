import { Component } from "../component.js";
import { Debt, IDebt } from "../debt/index.js";

class IParams {
  parent = new HTMLElement();
  debts = new Array(new IDebt);
}

class DebtList extends Component {
  _debts = new Array();

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

  get cards() {
    return this._cards;
  }

  /**
   * 
   * @param { IParams } params 
   */
  _create(params) {
    const list = super.createElement({
      tag: "ul",
      name: "list",
      parent: params.parent,
    });

    params.debts.forEach((d) => {
      const debt = new Debt({
        parent: list,
        type: d.type,
        title: d.title,
        date: new Date(d.date),
        value: Number(d.value),
      });

      this._debts.push(d);
      list.appendChild(debt.element);
    });

    return list;
  }

  /**
   * 
   * @param { IDebt } card 
   */
  addDebt(params) {
    const debt = new Debt({
      parent: this._element,
      type: params.type,
      title: params.title,
      date: new Date(params.date),
      value: Number(params.value),
    });

    this._debts.push(params);
    this._element.appendChild(debt.element);
    localStorage.setItem("debts", JSON.stringify(this._debts));
  }
}

export { DebtList };