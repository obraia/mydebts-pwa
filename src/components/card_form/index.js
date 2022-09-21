import { ICard } from "../card/index.js";
import { Component } from "../component.js";

const COLORS_LIST = [
  "--gradient-black",
  "--gradient-purple",
  "--gradient-blue",
  "--gradient-orange",
];

class IParams {
  parent = new HTMLElement();
  onSubmit = Function();
  card = new ICard();
}

class CardForm extends Component {
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
    const form = super.createElement({
      tag: "form",
      name: "form",
      parent: params.parent,
      events: {
        submit: (event) => this.onSubmit(event, params.onSubmit),
      }
    });

    const fieldSet = super.createElement({
      tag: "fieldset",
      name: "fieldset",
      parent: form,
    });

    const legend = super.createElement({
      tag: "div",
      name: "title",
      parent: fieldSet,
      innerText: params.card ? "Editar cartão" : "Adicionar cartão",
    });

    const title = super.createElement({
      tag: "input",
      name: "input",
      parent: fieldSet,
      attributes: {
        name: "title",
        type: "text",
        placeholder: "Nome do cartão",
        required: true,
        value: params.card ? params.card.title : "",
      },
    });

    const number = super.createElement({
      parent: fieldSet,
      tag: "input",
      name: "input",
      attributes: {
        name: "number",
        type: "number",
        step: "0.01",
        maxlength: 4,
        placeholder: "Últimos 4 dígitos do cartão",
        required: true,
        value: params.card ? params.card.number : "",
      },
      events: {
        input: ({ target }) => target.value.length > 4 && (target.value = target.value.slice(0, 4)),
      }
    });

    const flag = super.createElement({
      tag: "input",
      name: "input",
      parent: fieldSet,
      attributes: {
        name: "flag",
        type: "text",
        placeholder: "Bandeira do cartão",
        required: true,
        value: params.card ? params.card.flag : "",
      },
    });

    const colors = super.createElement({
      parent: fieldSet,
      tag: "div",
      name: "colors",
    });

    for (const c of COLORS_LIST) {
      const label = super.createElement({
        parent: colors,
        tag: "label",
        name: "label",
      });

      const input = super.createElement({
        parent: label,
        tag: "input",
        name: "input",
        attributes: {
          name: "color",
          type: "radio",
          value: c,
        },
      });    

      input.checked = params.card ? params.card.color === c : (c === COLORS_LIST[0]);

      const option = super.createElement({
        parent: label,
        tag: "span",
        name: "option",
        classList: [c]
      });

      label.append(input, option);
      colors.appendChild(label);
    }

    const group = super.createElement({
      parent: fieldSet,
      tag: "div",
      name: "group",
      children: [
        params.card ? super.createElement({
          parent: fieldSet,
          tag: "button",
          name: "button",
          innerHTML: "Deletar",
          classList: ["--delete"],
        }) : null,
        super.createElement({
          parent: fieldSet,
          tag: "button",
          name: "button",
          innerHTML: params.card ? "Editar" : "Adicionar",
          attributes: {
            type: "submit",
          },
        }),
      ]
    });

    fieldSet.append(legend, title, number, flag, colors, group);
    form.appendChild(fieldSet);
    
    return form;
  }

  /**
   * 
   * @param { FormDataEvent } event 
   */
  onSubmit(event, callback) {
    event.preventDefault();

    const data = {
      title: event.target.title.value,
      number: event.target.number.value,
      flag: event.target.flag.value,
      color: event.target.color.value,
    };

    if(callback) {
      callback(data);
    }
  }
}

export { CardForm };