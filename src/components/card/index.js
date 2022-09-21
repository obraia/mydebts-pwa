import { Component } from "../component.js";

class ICard {
  title = String();
  number = String();
  flag = String();
  color = String();
}

class IParams extends ICard {
  parent = new HTMLElement();
}

class Card extends Component {
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

  get number() {
    return this._number.innerText;
  }

  set number(value) {
    this._number.innerText = value;
  }

  set flag(value) {
    this._flag.innerText = value;
  }

  get flag() {
    return this._flag.innerText;
  }

  get title() {
    return this._title.innerText;
  }

  set title(value) {
    this._title.innerText = value;
  }

  /**
   * 
   * @param { IParams } params 
   */
  _create(params) {
    const card = super.createElement({
      tag: "li",
      name: "card",
      parent: params.parent,
      classList: [params.color],
      events: {
        click: () => document.showCardModal(params),
      }
    });

    this._number = super.createElement({
      tag: "p",
      name: "number",
      parent: card,
      innerText: this._completeCardNumber(params.number),
    });

    this._flag = super.createElement({
      tag: "p",
      name: "flag",
      parent: card,
      innerText: params.flag,
    });

    this._title = super.createElement({
      tag: "p",
      name: "title",
      parent: card,
      innerText: params.title,
    });

    card.append(this._number, this._flag, this._title);
    
    return card;
  }

  _completeCardNumber(number) {
    return "*".repeat(12).split("").map((v, i) => i % 4 ? v : ` ${v}`).join("").trim() + " " + number;
  }

  _onClick() {
    document.showCardModal();
  }
}

export { Card, ICard };