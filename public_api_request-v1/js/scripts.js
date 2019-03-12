/********************
 * Helper Variables *
 ********************/
const numUsers = 12;
const users = [];
/********************
 *   Fetch Methods  *
 ********************/
function fetchData(url) {
	return fetch(url).then((res) => res.json());
}

function fetchUsers(numUsers) {
	for (i = 0; i < numUsers; i++) {
		fetchData('https://randomuser.me/api/')
			.then((data) => {
				user = data.results[0];
				users.push(user);
			})
			.catch(() => console.log('Something went wrong.'));
	}
}

/********************
 *   Helper Methods *
 ********************/

fetchUsers(numUsers);
