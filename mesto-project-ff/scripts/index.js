// @todo: Темплейт карточки
// Получение шаблона карточки из документа
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
// Определение контейнера для вставки карточек
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
// Функция для создания карточки
function createCard(item) {
    const сardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = сardElement.querySelector('.card__image');
    const cardTitle = сardElement.querySelector('.card__title');
    const deleteButton = сardElement.querySelector('.card__delete-button');
    
    // Установка значений карточки
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    // Навешивание обработчика события на кнопку удаления
    deleteButton.addEventListener('click', function () {
        deleteCard(сardElement);
    });

    return сardElement;
}

// @todo: Функция удаления карточки
// Функция для удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
// Функция для отображения начальных карточек на странице
function renderInitialCards(cards) {
    cards.forEach(cardData => {
        const cardElement = createCard(cardData);
        cardsContainer.append(cardElement);
    });
}

// Вызываем функцию отображения карточек при загрузке страницы
document.addEventListener('DOMContentLoaded', () => renderInitialCards(initialCards));







 