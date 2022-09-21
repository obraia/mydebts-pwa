import { Component } from "../component.js";
import { Card, ICard } from "../card/index.js";
import { CardNew } from "../card_new/index.js";

class IParams {
  parent = new HTMLElement();
  cards = new Array(new ICard);
}

class CardCarousel extends Component {
  _cards = new Array();

  /**
   * 
   * @param { IParams } params 
   * @returns 
   */
  constructor(params) {
    super(params);
    this._element = this._create(params);
    this._appendNewCard()
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
   * @returns 
   */
  _create(params) {
    const carousel = super.createElement({
      tag: "ul",
      name: "carousel",
      parent: params.parent,
    });

    params.cards.forEach((c) => {
      const card = new Card({
        parent: carousel,
        title: c.title,
        number: this._completeCardNumber(c.number),
        flag: c.flag,
        color: c.color,
      });

      this._cards.push(c);
      carousel.appendChild(card.element);
    });

    return carousel;
  }

  _appendNewCard() {
    const card = new CardNew({
      parent: this._element,
    });

    this._element.append(card.element);
  }

  _removeNewCard() {
    const card = this._element.lastElementChild;
    this._element.removeChild(card);
  }

  _completeCardNumber(number) {
    return "*".repeat(12).split("").map((v, i) => i % 4 ? v : ` ${v}`).join("") + " " + number;
  }

  /**
   * 
   * @param { ICard } params 
   */
  addCard(params) {
    const card = new Card({
      parent: this._element,
      title: params.title,
      number: this._completeCardNumber(params.number),
      flag: params.flag,
      color: params.color,
    });

    this._removeNewCard();
    this._element.appendChild(card.element);
    this._appendNewCard();
    
    this._cards.push(params);
    localStorage.setItem("cards", JSON.stringify(this._cards));
  }
  
}

export { CardCarousel };