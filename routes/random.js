const express = require('express');
const Axios = require('axios');
const { setupCache } = require('axios-cache-interceptor');
const axios = setupCache(Axios);

const toChar = chr => chr.charCodeAt(0);
const getLetter = () => String.fromCharCode(Math.floor(Math.random()*26) + toChar('a'))
const router = express.Router({mergeParams: true});

const MAX_COUNT = 15001

router.get("/", (req, res) => {
	genWord(req, res);
});

router.get("/:letter", (req, res) => {
	genWord(req, res, req.params.letter.toLowerCase());
});

async function genWord(req, res, letter=undefined) {
	const type = req.params.type.toLowerCase();
	const cnt = parseInt(req.query.count) || 1;
	const letter_is_given = !!letter

	try {
		if (type != 'noun' && type != 'animal' && type != 'adjective')
			throw "invalid word form";
		else if (isNaN(cnt) || cnt < 1)
			throw "invalid number of words";
	} catch (err) {
		res.sendStatus(404);
		return;
	}
	if (cnt > MAX_COUNT) {
		res.sendStatus(429)
		return
	}

	if (!letter_is_given && cnt > 1) {
		await genRandomLetterType(res, `${type}s`, cnt)
		return
	}
	getWordStartingWith(letter, `${type}s`, cnt)
		.then(words => res.send(words))
		.catch(err => res.sendStatus(500));
}

async function getWordStartingWith(letter, type, cnt=1) {
	if (letter === undefined || toChar(letter) < toChar('a') || toChar(letter) > toChar('z')) letter = getLetter()
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

async function genRandomLetterType(res, type, total) {
	try {
		res.type('json')
		res.write("[")
		for (let i=0;i<total;i++) {
			let ltr = getLetter()
			let wrd = await getWordStartingWith(ltr, type, 1)
			res.write(`"${wrd}"${i === total - 1 ? '' : ','}`)
		}
		res.write("]")
		res.end()
	} catch (e) {
		res.sendStatus(500)
	}
}

module.exports = router;
