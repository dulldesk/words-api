const express = require('express');
const fs = require('fs');

const toChar = chr => chr.charCodeAt(0);

exports.genType = async function(req, res) {
	const type = req.params.type.toLowerCase();

	if (type != 'noun' && type != 'animal' && type != 'adjective') {
		res.send("Invalid word type requested");
		return;
	}

	const letter = String.fromCharCode(Math.floor(Math.random()*26) + toChar('a'));

	await getWordStartingWith(letter, `${type}s`)
		.then(word => res.send([word]))
		.catch(err => res.send("An error occured "+err));
};

exports.genLetterOfType = async function(req, res) {
	const type = req.params.type.toLowerCase();
	const letter = req.params.letter.toLowerCase();

	if (toChar(letter) < toChar('a') || toChar(letter) > toChar('z')) {
		res.send("Invalid letter requested");
		return;
	}
	else if (type != 'noun' && type != 'animal' && type != 'adjective') {
		res.send("Invalid word type requested");
		return;
	}

	await getWordStartingWith(letter, `${type}s`)
		.then(word => res.send([word]))
		.catch(err => res.send("An error occured "+err));
};

const axios = require('axios');

async function getWordStartingWith(letter, type) {
	return new Promise((resolve, reject) => {
		axios.get(`https://dulldesk.github.io/words/${type}/${letter}-min.json`)
			.then(response => {
				let all = response.data;
				resolve(all[Math.floor(Math.random()*all.length)]);
			})
			.catch(err => {
				reject(err);
			});
	});
}

