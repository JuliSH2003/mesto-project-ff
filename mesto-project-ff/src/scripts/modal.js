function openModal(popup) {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', handleKeyDown);
}

function closeModal(popup) {
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', handleKeyDown);
}

function handleModalClick(evt) {
	// для обработки кликов по оверлею
	if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__overlay')) {
	  closeModal(evt.target.closest('.popup'));
	}
}

function handleKeyDown(evt) {
	if (evt.key === 'Escape') {
	  const openedPopup = document.querySelector('.popup_is-opened');
	  if (openedPopup) {
		closeModal(openedPopup);
	  }
	}
}

export { openModal, closeModal, handleModalClick, handleKeyDown};