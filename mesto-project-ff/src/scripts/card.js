import { addLike, deleteLike, onDelete} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;


// Функция для создания карточки
function createCard(item, openImage, myId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__likes-counter');
    likesCounter.textContent = item.likes.length;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    // Устанавливаем видимость кнопки удаления
    setDeleteButton(item, myId, deleteButton);
    deleteButton.addEventListener('click', () => {
        deleteCard(deleteButton, item._id);
    });
    likeButton.addEventListener('click', () => {
        likeHandler(likeButton, item._id, likesCounter);
    });
    cardImage.addEventListener('click', () => openImage(item.name, item.link));
    return cardElement;
}

// Функция лайка карточки
function likeHandler(likeElement, cardId, counterElement) {
    if (!likeElement.classList.contains('card__like-button_is-active')) {
        addLike(cardId)
            .then(data => {
                likeElement.classList.add('card__like-button_is-active');
                counterElement.textContent = data.likes.length;
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        deleteLike(cardId)
            .then(data => {
                likeElement.classList.remove('card__like-button_is-active');
                counterElement.textContent = data.likes.length;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

// Функция установки кнопки удаления
function setDeleteButton(card, myId, deleteButton) {
    if (card.owner[`_id`] === myId){
        deleteButton.style.display = 'none'; // Скрыть кнопку
    } else {
        deleteButton.style.display = 'block'; // Показать кнопку
    }
}

// Функция для удаления карточки
function deleteCard(cardElement, cardId) {
    onDelete(cardId)
        .then(() => {
            cardElement.closest('.card').remove();
        })
        .catch(err => console.log(err));
}

export { createCard, deleteCard, likeHandler};