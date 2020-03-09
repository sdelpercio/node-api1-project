const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());

let users = [];

server.get('/', (req, res) => {
	return res.status(418).send("I'm a teapot");
});

//  Create a New User
server.post('/api/users', (req, res) => {
	const newUser = req.body;

	if (!newUser || typeof newUser !== 'object') {
		return res
			.status(400)
			.json({ errorMessage: 'Please provide an object with a name and bio.' });
	} else if (!newUser.name || !newUser.bio) {
		return res
			.status(400)
			.json({ errorMessage: 'Please provide name and bio for the user.' });
	} else {
		newUser.id = shortid.generate();
		users.push(newUser);
		return res.status(201).json(newUser);
	}
});

// Get All Users
server.get('/api/users', (req, res) => {
	if (!users) {
		return res
			.status(500)
			.json({ errorMessage: 'The users information could not be retrieved.' });
	} else {
		return res.status(200).json(users);
	}
});

// Get a Specific User
server.get('/api/users/:userID', (req, res) => {
	if (!req.params.userID) {
		return res
			.status(400)
			.json({ errorMessage: 'Please include the users ID in the path' });
	} else {
		const userID = req.params.userID;
		const filteredUsers = users.filter(item => item.id === userID);
		if (filteredUsers.length === 0) {
			return res
				.status(404)
				.json({ errorMessage: 'The user with the specific ID does not exist' });
		} else {
			return res.status(200).json(filteredUsers[0]);
		}
	}
});

// Delete a User
server.delete('/api/users/:userID', (req, res) => {
	if (!req.params.userID) {
		return res
			.status(400)
			.json({ errorMessage: 'Please include the users ID in the path' });
	} else {
		const userID = req.params.userID;
		const foundUser = users.find(item => item.id === userID);
		if (foundUser === undefined) {
			return res
				.status(404)
				.json({ errorMessage: 'The user with the specific ID does not exist' });
		} else {
			users = users.filter(item => item.id !== userID);

			return res.status(200).json(foundUser);
		}
	}
});

const PORT = 5000;
server.listen(PORT, () =>
	console.log(`\n ** listening on PORT: ${PORT} ** \n`)
);
