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

class CardNew extends Component {
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
      tag: "div",
      name: "cardnew",
      parent: params.parent,
      classList: [params.color],
    });

    const text = super.createElement({
      tag: "p",
      name: "text",
      parent: card,
      innerText: "Cadastrar novo cartão",
    });

    const button = super.createElement({
      parent: card,
      tag: "button",
      name: "button",
      children: [
        super.createElement({
          tag: "i",
          name: "icon",
          classList: ["fa-solid", "fa-plus", "fa-xl"],
        }),
      ],
      events: {
        click: () => document.showCardModal(),
      },
    });

    card.append(text, button);
    
    return card;
  }
}

export { CardNew, ICard };