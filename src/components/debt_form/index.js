import { Component } from "../component.js";

const ICONS_LIST = [
  "fa-solid fa-bowl-food",
  "fa-solid fa-file-invoice-dollar",
  "fa-solid fa-bag-shopping",
  "fa-solid fa-basket-shopping",
]


class IParams {
  parent = new HTMLElement();
}

class DebtForm extends Component {
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
      innerText: "Adicionar dívida",
    });

    const title = super.createElement({
      tag: "input",
      name: "input",
      parent: fieldSet,
      attributes: {
        type: "text",
        name: "title",
        placeholder: "Nome da dívida",
        required: true,
      },
    });

    const date = super.createElement({
      tag: "input",
      name: "input",
      parent: fieldSet,
      attributes: {
        type: "text",
        name: "date",
        placeholder: "Data da dívida",
        required: true,
      },
      events: {
        focus: (event) => {
          event.target.type = "date";
          setTimeout(() => { event.target.showPicker() } , 10);
        },
        blur: (event) => {
          if(event.target.value === "") {
            event.target.type = "text";
          }
        }
      }
    });

    const value = super.createElement({
      parent: fieldSet,
      tag: "input",
      name: "input",
      attributes: {
        name: "value",
        type: "number",
        step: "0.01",
        placeholder: "Valor da dívida",
        required: true,
      },
    });

    const types = super.createElement({
      parent: fieldSet,
      tag: "div",
      name: "types",
    });

    for (const i of ICONS_LIST) {
      const label = super.createElement({
        parent: types,
        tag: "label",
        name: "label",
      });

      const input = super.createElement({
        parent: label,
        tag: "input",
        name: "input",
        attributes: {
          type: "radio",
          name: "type",
          value: i,
        },
      });    

      input.checked = i === ICONS_LIST[0];

      const option = super.createElement({
        parent: label,
        tag: "span",
        name: "option",
      });

      const icon = super.createElement({
        parent: option,
        tag: "i",
        name: "icon",
        classList: i.split(" "),
      });

      option.appendChild(icon);
      label.append(input, option);
      types.appendChild(label);
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

    fieldSet.append(legend, title, date, value, types, group);
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
      date: event.target.date.value,
      value: event.target.value.value,
      type: event.target.type.value,
    };

    if(callback) {
      callback(data);
    }
  }
}

export { DebtForm };