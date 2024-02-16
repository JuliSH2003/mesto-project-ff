// Функция переключения состояния модального окна (открыть/закрыть)
function toggleModal(popup) {
	popup.classList.toggle('popup_is-opened');
}

// Обработчик клика, который закрывает модальное окно, если клик произведен на оверлее
function handleModalClick(evt) {
	const isOpened = evt.target.classList.contains('popup_is-opened');
	if (isOpened && evt.target === evt.currentTarget) {
		toggleModal(evt.target);
	}
}

// Функция для закрытия модального окна при клике на кнопку закрытия
function handleCloseButtonClick(evt) {
	const popup = evt.target.closest('.popup');
	if (popup) {
		toggleModal(popup);
	}
}

// Обработчик нажатия клавиш, который закрывает модальное окно при нажатии Escape
function handleKeyDown(evt) {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		if (openedPopup) {
			toggleModal(openedPopup);
		}
	}
}

// Добавление обработчика событий для нажатия клавиш на весь документ
document.addEventListener('keydown', handleKeyDown);

// Добавление обработчика событий для клика на весь документ
document.addEventListener('click', handleModalClick);

// Находим все кнопки закрытия и добавляем им обработчики событий
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(button => {
	button.addEventListener('click', handleCloseButtonClick);
});

export { toggleModal};