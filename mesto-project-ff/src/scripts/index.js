import { createCard, onDelete, addLike} from './card.js';
import { initialCards } from './cards.js';
import { toggleModal } from './modal.js';
import '../style.css';

// Получение доступа к основным элементам страницы
const pageContent = document.querySelector('.page__content');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');

// Нахождение всех модальных окон на странице и конкретных элементов для интерактивности
const popups = pageContent.querySelectorAll('.popup');
const openImagePopup = pageContent.querySelector('.popup_type_image');
const editProfilePopup = pageContent.querySelector('.popup_type_edit');
const addCardPopup = pageContent.querySelector('.popup_type_new-card');
const buttonOpenEditProfilePopup = pageContent.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = pageContent.querySelector('.profile__add-button');
const popupImage = pageContent.querySelector('.popup__image');
const imageTitle = pageContent.querySelector('.popup__caption');

// Получение доступа к формам и их элементам
const forms = document.forms;
const formEditProfile = forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = pageContent.querySelector('.profile__title');
const profileDescription = pageContent.querySelector('.profile__description');
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements['place-name'];
const cardLink = formNewCard.elements.link;

// Функция для открытия модального окна с картинкой
function openImage(cardName, cardLink) {
  toggleModal(openImagePopup);
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  imageTitle.textContent = cardName;
}

// Функция для обработки отправки формы редактирования профиля
function handleFormSubmitForEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  toggleModal(editProfilePopup);
}

// Функция для обработки отправки формы добавления новой карточки
function handleFormSubmitForAddCard(evt) {
  evt.preventDefault();
  addCardToList(cardName.value, cardLink.value);
  formNewCard.reset();
  toggleModal(addCardPopup);
}

// Функция для добавления карточки, если есть имя и ссылка на изображение
function addCardToList(cardName, cardLink) {
  if (cardName && cardLink && cardLink.startsWith('http')) {
    const cardData = { name: cardName, link: cardLink };
    // Передаем функцию openImage как аргумент
    const cardElement = createCard(cardData, onDelete, openImage);
    cardList.prepend(cardElement);
  }
}

// Обработчик событий для отправки формы добавления новой карточки
formNewCard.addEventListener('submit', handleFormSubmitForAddCard);

// Обработчик кликов для модальных окон, закрывающий их при клике на оверлей
function handleModalClick(evt) {
  if (evt.target.classList.contains('popup')) {
    toggleModal(evt.target);
  }
}

// Обработчик нажатий клавиш для закрытия модальных окон
function handleKeyDown(evt) {
  if (evt.key === 'Escape') {
    popups.forEach(popup => {
      if (popup.classList.contains('popup_opened')) {
        toggleModal(popup);
      }
    });
  }
}

// Добавление обработчиков событий клика для кнопок открытия модальных окон
buttonOpenEditProfilePopup.addEventListener('click', () => toggleModal(editProfilePopup));
buttonOpenAddCardPopup.addEventListener('click', () => toggleModal(addCardPopup));

// Добавление обработчиков событий для закрытия модальных окон при клике на оверлей
popups.forEach(popup => {
  popup.addEventListener('click', handleModalClick);
});

// Добавление обработчиков событий для отправки форм
formEditProfile.addEventListener('submit', handleFormSubmitForEdit);

// Обработчики событий для закрытия модальных окон при нажатии клавиш
document.addEventListener('keydown', handleKeyDown);

export {openImagePopup, popupImage, imageTitle}