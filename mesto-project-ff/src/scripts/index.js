import {createCard, deleteCard, likeHandler} from './card.js';
import { initialCards } from './cards.js';
import {openModal, closeModal, handleModalClick, handleKeyDown} from './modal.js';
import {clearValidation, enableValidation, checkInputValidity} from './validation.js';
import {addLike,
	deleteLike,
	onDelete,
	likesCounter,
	getInitialCards,
	getProfileInfo,
	newAvatar,
	newCard,
	updateProfileInfo} from './api.js';
import '../style.css';

const pageContent = document.querySelector('.page__content');
const cardContainer = pageContent.querySelector('.places');
const cardList = cardContainer.querySelector('.places__list');

const popups = pageContent.querySelectorAll('.popup');
const openImagePopup = pageContent.querySelector('.popup_type_image');
const editProfilePopup = pageContent.querySelector('.popup_type_edit');
const addCardPopup = pageContent.querySelector('.popup_type_new-card');
const buttonOpenEditProfilePopup = pageContent.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = pageContent.querySelector('.profile__add-button');
const popupImage = pageContent.querySelector('.popup__image');
const imageTitle = pageContent.querySelector('.popup__caption');

const forms = document.forms;
const formEditProfile = forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = pageContent.querySelector('.profile__title');
const profileDescription = pageContent.querySelector('.profile__description');
const formNewCard = forms['new-place'];
const cardName = formNewCard.elements['place-name'];
const cardLink = formNewCard.elements.link;
const closeButtons = document.querySelectorAll('.popup__close');
const submitEditProfileButton = editProfilePopup.querySelector('.popup__button');
const submitAddCardButton = addCardPopup.querySelector('.popup__button');

const profileAvatar = pageContent.querySelector('.profile__avatar');
const avatarPopup = pageContent.querySelector('.popup_type_new-avatar');
const avatarForm = document.forms['new-avatar'];
const avatarSubmitButton = avatarForm.querySelector('.popup__button');
const avatarLinkInput = avatarForm.elements.link;

let myId = '';

// Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = '';
  }
}

function openImage(cardName, cardLink) {
  openModal(openImagePopup);
  popupImage.src = cardLink;
  popupImage.alt = cardName;
  imageTitle.textContent = cardName;
}

function handleFormSubmitForEdit(evt) {
  evt.preventDefault();
  renderLoading(true, submitEditProfileButton);
  updateProfileInfo(nameInput.value, jobInput.value)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, buttonOpenEditProfilePopup));
}

function handleFormSubmitForAddCard(evt) {
  evt.preventDefault();
  renderLoading(true, submitAddCardButton);
  newCard(cardName.value, cardLink.value)
    .then((card) => {
      cardList.prepend(createCard(card, onDelete, addLike, openImage));
      closeModal(addCardPopup);
      formNewCard.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => renderLoading(false, buttonOpenAddCardPopup));
}

// Функция для добавления обработчиков событий смены аватара
function setupAvatarChange() {
  // Очистка сообщений валидации и начальное состояние формы
  clearValidation(avatarForm, validationConfig);
  // Добавление валидации
  enableValidation(validationConfig);
  profileAvatar.addEventListener('click', () => {
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
  });
  avatarForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!avatarLinkInput.validity.valid) {
      checkInputValidity(avatarForm, avatarLinkInput);
    } else {
      renderLoading(true, avatarSubmitButton);
      newAvatar(avatarLinkInput.value)
        .then((res) => {
          profileAvatar.style.backgroundImage = `url('${res.avatar}')`;
          closeModal(avatarPopup);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          renderLoading(false, avatarSubmitButton);
        });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getProfileInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
  myId = userData[`_id`];
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, openImage, myId);
  cardList.append(cardElement);
  });
  })
  .catch((err) => {
  console.error(err);
  });
  setupAvatarChange();
});

buttonOpenEditProfilePopup.addEventListener('click', () => {
  clearValidation(formEditProfile, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

buttonOpenAddCardPopup.addEventListener('click', () => {
  clearValidation(formNewCard, validationConfig);
  formNewCard.reset();
  openModal(addCardPopup);
});

formEditProfile.addEventListener('submit', handleFormSubmitForEdit);
formNewCard.addEventListener('submit', handleFormSubmitForAddCard);
avatarForm.addEventListener('submit', setupAvatarChange);
popups.forEach((popup) => {
  popup.addEventListener('click', handleModalClick);
});


// Добавление обработчика событий для кнопок закрытия модальных окон
closeButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Найти ближайшее модальное окно, которое содержит кнопку закрытия
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});
