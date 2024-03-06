const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: '1ad13ddf-933e-4b57-be47-30f81cc4ff1f',
        'Content-Type': 'application/json',
    },
};

// Функция для обработки ответа от сервера
function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция для получения начального набора карточек
function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(res => handleResponse(res));
}

// Функция для получения информации о профиле пользователя
function getProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    }).then(res => handleResponse(res));
}

// Функция для обновления профильной информации пользователя
function updateProfileInfo(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: name,
            about: about,
        }),}).then(res => handleResponse(res));
}

// Функция для добавления новой карточки
function newCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
        method: 'POST',
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    }).then(res => handleResponse(res));
}

// Функция для удаления карточки пользователя
function onDelete(cardId) {
    // Отправляем DELETE-запрос для удаления карточки по её идентификатору
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        headers: config.headers,
        method: 'DELETE', 
    }).then(res => handleResponse(res));
}

// Функция для получения счётчика лайков карточек
function likesCounter() {
    // Отправляем GET-запрос на URL карточек.
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    }).then(res => handleResponse(res));
}

// Функция для добавления лайка к карточке
function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'PUT',
    }).then(res => handleResponse(res));
}

// Функция для удаления лайка к карточке
function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        headers: config.headers,
        method: 'DELETE',
    }).then(res => handleResponse(res));
}

function newAvatar(link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        headers: config.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: link,
        }),
    }).then(res => handleResponse(res));
}

export {
    addLike,
    deleteLike,
	onDelete,
	likesCounter,
	getInitialCards,
	getProfileInfo,
	newAvatar,
	newCard,
	updateProfileInfo,
};