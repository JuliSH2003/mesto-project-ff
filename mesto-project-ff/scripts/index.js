// @todo: Темплейт карточки
// Получение шаблона карточки из документа
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
// Определение контейнера для вставки карточек
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
// Функция для создания карточки
function createCard(item, onDelete) {
    const сardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = сardElement.querySelector('.card__image');
    const cardTitle = сardElement.querySelector('.card__title');
    const deleteButton = сardElement.querySelector('.card__delete-button');
    
    // Установка значений карточки
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    deleteButton.addEventListener('click',() => onDelete(сardElement));
    return сardElement;
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







 