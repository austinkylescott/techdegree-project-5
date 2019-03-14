/********************
 * Helper Variables *
 ********************/
const numUsers = 12;
const gallery = document.querySelector('#gallery');
let cards = document.querySelectorAll('.card');
let users = [];
/********************
 *   Fetch Methods  *
 ********************/
function fetchData(url) {
	return fetch(url).then((res) => res.json());
}

function fetchUsers() {
	fetchData(`https://randomuser.me/api/?results=${numUsers}&nat=us`)
		.then((data) => (users = data.results))
		.then((users) => displayGallery(users));
}
fetchUsers();

/********************
 *  Event Listeners *
 ********************/
function setCardListeners() {
	cards.forEach((card) => {
		card.addEventListener('click', function(event) {
			displayModal(card);
		});
	});
}

function setModalListeners() {
	const modal = document.querySelector('.modal-container');
	const closeButton = document.querySelector('.modal-close-btn');
	closeButton.addEventListener('click', function(event) {
		modal.parentElement.removeChild(modal);
	});
}

/********************
 *   Helper Methods *
 ********************/

//Displays users and generates card event listeners
function displayGallery(users) {
	let galleryHTML = '';

	users.map((user) => {
		galleryHTML += `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src=${user.picture.thumbnail} alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                                <p class="card-text">${user.email}</p>
                                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                            </div>
                        </div>`;
	});

	gallery.innerHTML = galleryHTML;
	cards = document.querySelectorAll('.card');
	setCardListeners();
}

function displayModal(card) {
	const cardName = card.querySelector('#name').textContent;
	let modalDIV = document.createElement('div');
	modalDIV.className = 'modal-container';
	users.forEach((user) => {
		if (`${user.name.first} ${user.name.last}` === cardName) {
			modalDIV.innerHTML = generateModalHTML(user);
		}
	});
	document.body.appendChild(modalDIV);
	setModalListeners();
}

function generateModalHTML(user) {
	const birthday = new Date(user.dob.date);

	return `<div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${user.phone}</p>
                    <p class="modal-text cap">${user.location.street}, ${user.location.city}, ${user.location
		.state} ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthday.getMonth()}/${birthday.getDay()}/${birthday.getFullYear()}</p>
            </div>
    `;
}
