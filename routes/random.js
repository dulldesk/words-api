const express = require('express');
const axios = require('axios');
//const fs = require('fs')

const toChar = chr => chr.charCodeAt(0);

exports.genType = function(req, res) {
	const letter = String.fromCharCode(Math.floor(Math.random()*26) + toChar('a'));
	genWord(req, res, letter);
};

exports.genLetterOfType = function(req, res) {
	genWord(req, res);
};

async function genWord(req, res, letter=undefined) {
	const type = req.params.type.toLowerCase();
	letter = letter || req.params.letter.toLowerCase();
	const cnt = req.query.count || 1;

	try {
		if (toChar(letter) < toChar('a') || toChar(letter) > toChar('z'))
			throw "invalid letter";
		else if (type != 'noun' && type != 'animal' && type != 'adjective')
			throw "invalid word form";
		else if (cnt < 1) 
			throw "invalid number of words";
	} catch (err) {
		res.sendStatus(404);
		return;
	}

	await getWordStartingWith(letter, `${type}s`, cnt)
		.then(word => res.send(word))
		.catch(err => res.sendStatus(500));
}

async function getWordStartingWith(letter, type, cnt=1) {
	return new Promise((resolve, reject) => {
		axios.get(`https://dulldesk.github.io/words/${type}/${letter}-min.json`)
			.then(response => {
				let allwords = response.data;
				// cnt = Math.min(allwords.length, cnt);
				let ans = new Array(cnt);
				for (let i=0;i<cnt;i++) ans[i] = allwords[Math.floor(Math.random()*allwords.length)];
				resolve(ans);
			})
			.catch(err => reject(err));
	});
}

