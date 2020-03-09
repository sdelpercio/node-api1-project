const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());

const users = [];

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

server.get('/api/users', (req, res) => {
	if (!users) {
		return res
			.status(500)
			.json({ errorMessage: 'The users information could not be retrieved.' });
	} else {
		return res.status(200).json(users);
	}
});

const PORT = 5000;
server.listen(PORT, () =>
	console.log(`\n ** listening on PORT: ${PORT} ** \n`)
);
