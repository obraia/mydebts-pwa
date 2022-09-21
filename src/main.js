import { CardCarousel } from "./components/card_carousel/index.js";
import { CardForm } from "./components/card_form/index.js";
import { DebtForm } from "./components/debt_form/index.js";
import { DebtList } from "./components/debt_list/index.js";

const debts = JSON.parse(localStorage.getItem("debts")) || [];
const cards = JSON.parse(localStorage.getItem("cards")) || [];

const get = (className) => document.getElementsByClassName(className).item(0);

function toggleTheme() {
  const result = get("app").classList.toggle("--dark");
  localStorage.setItem("theme", result ? "--dark" : "--light");
}

function showDebtModal(editDebt) {
  const modal = get("app__modal");
  const modalContent = get("app__modal__content");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const debtForm = new DebtForm({
    parent: modalContent,
    debt: editDebt,
    onSubmit: (data) => {
      debtList.addDebt({
        title: data.title,
        value: Number(data.value),
        date: new Date(data.date),
        type: data.type,
      });

      closeModal();
    }
  })

  modalContent.appendChild(debtForm.element);
  modal.classList.remove("--hidden");
}

function showCardModal(editCard) {
  const modal = get("app__modal");
  const modalContent = get("app__modal__content");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  const cardForm = new CardForm({
    parent: modalContent,
    card: editCard,
    onSubmit: (data) => {
      cardCarousel.addCard({
        title: data.title,
        number: Number(data.number),
        flag: data.flag,
        color: data.color,
      });

      closeModal();
    }
  })

  modalContent.appendChild(cardForm.element);
  modal.classList.remove("--hidden");
}

function closeModal() {
  const modal = get("app__modal");
  const modalContent = get("app__modal__content");

  modalContent.innerHTML = "";
  modal.classList.add("--hidden");
}

function onLoad() {
  get("app").classList.add(localStorage.getItem("theme"));
  get("app__container__cards__carousel").replaceWith(cardCarousel.element);
  get("app__container__debts__list").replaceWith(debtList.element);
}

const cardCarousel = new CardCarousel({
  parent: get("app__container__cards"),
  cards,
});

const debtList = new DebtList({
  parent: get("app__container__debts"),
  debts,
});

document.toggleTheme = toggleTheme;
document.showDebtModal = showDebtModal;
document.showCardModal = showCardModal;

window.addEventListener('load', onLoad);