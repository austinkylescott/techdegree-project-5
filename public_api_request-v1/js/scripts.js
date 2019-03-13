/********************
 * Helper Variables *
 ********************/
const numUsers = 12;
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

/********************
 *   Helper Methods *
 ********************/
function displayGallery(users) {
	let galleryHTML = '';

	users.forEach((user) => {
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

	document.querySelector('#gallery').innerHTML = galleryHTML;
}
