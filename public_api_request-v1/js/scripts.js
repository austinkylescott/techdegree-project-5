/********************
 * Helper Variables *
 ********************/
const numUsers = 12;
const gallery = document.querySelector('#gallery');
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
//Sets event listeners related to user cards
function setCardListeners() {
	const cards = document.querySelectorAll('.card');
	cards.forEach((card) => {
		card.addEventListener('click', function(event) {
			displayModal(card);
		});
	});
}
//Sets event listeners related to modal
function setModalListeners() {
	const cards = document.querySelectorAll('.card');
	const modal = document.querySelector('.modal-container');
	const modalName = modal.querySelector('#name').textContent;
	const closeButton = document.querySelector('.modal-close-btn');
	const prevButton = document.querySelector('#modal-prev');
	const nextButton = document.querySelector('#modal-next');
	closeButton.addEventListener('click', function(event) {
		modal.parentElement.removeChild(modal);
	});
	prevButton.addEventListener('click', function(event) {
		for (let i = 0; i < cards.length; i++) {
			let cardName = cards[i].querySelector('#name').textContent;
			if (cards[i - 1] !== undefined) {
				if (cardName === modalName) {
					modal.parentElement.removeChild(modal);
					displayModal(cards[i - 1]);
				}
			}
		}
	});

	nextButton.addEventListener('click', function(event) {
		for (let i = 0; i < cards.length; i++) {
			let cardName = cards[i].querySelector('#name').textContent;
			if (cards[i + 1] !== undefined) {
				if (cardName === modalName) {
					modal.parentElement.removeChild(modal);
					displayModal(cards[i + 1]);
				}
			}
		}
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
	setCardListeners();
}
//Displays modal with additional user info
function displayModal(card) {
	const cardName = card.querySelector('#name').textContent;
	let modalDIV = document.createElement('div');
	modalDIV.className = 'modal-container';
	modalDIV.innerHTML = '';
	users.forEach((user) => {
		if (`${user.name.first} ${user.name.last}` === cardName) {
			modalDIV.innerHTML = generateModalHTML(user);
		}
	});
	document.body.appendChild(modalDIV);
	setModalListeners();
}
//Generates HTML to be displayed in modal
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
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
    `;
}

function generateSearch() {
	let searchContainer = document.querySelector('.search-container');
	let searchHTML = '';
	searchHTML += "<input type='search' id='search-input' class='search-input' placeholder='Search...'>";
	searchHTML += "<input type='submit' value='&#x1F50D;' id='search-submit' class='search-submit'>";

	let searchForm = document.createElement('form');
	searchForm.action = '#';
	searchForm.method = 'get';
	searchForm.innerHTML = searchHTML;
	searchContainer.appendChild(searchForm);

	searchForm.addEventListener('input', function(event) {
		let searchInput = document.querySelector('#search-input').value;
		let filteredUsers = [];
		users.forEach((user) => {
			if (`${user.name.first} ${user.name.last}`.includes(searchInput)) {
				filteredUsers.push(user);
			}
		});
		displayGallery(filteredUsers);
	});
}
generateSearch();
