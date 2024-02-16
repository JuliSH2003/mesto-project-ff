// Без импортов не работали карточки, была ошибка "openImage not function" и "openImage not found". Эту ошибку смог решить только импортируя с index.js константы
import { initialCards } from './cards.js';
import { toggleModal } from './modal.js';
import {openImagePopup, popupImage, imageTitle} from './index.js'

// @todo: Темплейт карточки
// Получение шаблона карточки из документа
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
// Определение контейнера для вставки карточек
const cardsContainer = document.querySelector('.places__list');

//Функция лайка карточки
function addLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция создания карточки
// Функция для создания карточки
function createCard(item, onDelete) {
    const сardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = сardElement.querySelector('.card__image');
    const cardTitle = сardElement.querySelector('.card__title');
    const deleteButton = сardElement.querySelector('.card__delete-button');
    const likeButton = сardElement.querySelector('.card__like-button'); // Определяем кнопку лайк
    // Установка значений карточки
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click',() => onDelete(сardElement));
    // Добавление обработчика событий для лайка карточки
    likeButton.addEventListener('click', addLike);
    // Открытие изображения
    cardImage.addEventListener('click', () => openImage(item.name, item.link));
    return сardElement;
}

function openImage(cardName, cardLink) {
    // Здесь мы предполагаем, что openImagePopup, popupImage, и imageTitle доступны
    // Если они не доступны, их нужно передать в createCard как дополнительные параметры
    toggleModal(openImagePopup);
    popupImage.src = cardLink;
    popupImage.alt = cardName;
    imageTitle.textContent = cardName;
  }
  
// @todo: Функция удаления карточки
// Функция для удаления карточки
function onDelete(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
// Функция для отображения начальных карточек на странице
function renderCards(cards) {
    cards.forEach(cardData => {
        const сardElement = createCard(cardData, onDelete);
        cardsContainer.append(сardElement);
    });
}

// Вызываем функцию отображения карточек при загрузке страницы
document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));

export {createCard, onDelete, addLike};

