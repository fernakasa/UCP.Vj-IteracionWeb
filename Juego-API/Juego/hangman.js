const wordList = [
    "parakeet",
    "grateful",
    "performer",
    "algorithm",
    "honeydew",
    "twins",
    "anchovy",
    "mountain",
    "spruce",
    "waltz",
    "trust",
    "gardenia",
    "blossom",
    "silver",
    "fudge",
    "style",
    "shorthair",
    "garden",
    "spanish",
    "course",
    "harmony",
    "butterfly",
    "sapphire",
    "rifle",
    "electricity",
    "steel",
    "plankton",
    "future",
    "delaware"
];
const wordCategories = [
    "birds",
    "happiness",
    "circus",
    "programming",
    "fruit",
    "family",
    "fish",
    "camping",
    "tree",
    "dance",
    "feelings",
    "flowers",
    "plants",
    "colors",
    "desserts",
    "art",
    "cats",
    "house",
    "languages",
    "restaurant",
    "music theory",
    "insect",
    "minerals",
    "weapons",
    "science",
    "metals",
    "ocean",
    "time",
    "US States"
];
const wordHints = [
    "also known as 'budgie'",
    "feeling of appreciation",
    "a person who entertains an audience",
    "solves logical or mathematical problems",
    "a green melon",
    "two children born at the same birth",
    "can be eaten on pizza",
    "a very large, steep hill",
    "second darkest wood in minecraft",
    "a dance in triple time performed by a couple",
    "faith in someone",
    "a genus of flowering plants in the coffee family, Rubiaceae",
    "what flowers do when they're ready",
    "a metal used in jewelry",
    "involves chocolate",
    "design or make in a particular form",
    "they don't have long hair",
    "mainly where veggies are grown",
    "one of the top 5 most spoken languages in the world",
    "may include multiple dishes or only one",
    "chords/three or more notes played at the same time",
    "related to moths",
    "precious blue gemstone",
    "man-portable, long-barrelled firearm designed for accurate shooting",
    "form of energy used to power machines and electrical devices",
    "it is a major component used in buildings, infrastructure, tools, ships, trains, automobiles, machines, appliances, and weapons",
    "also featured in spongebob",
    "opposite of past",
    "starts with a D"
];

var wordIndex = Math.floor(Math.random() * 29);
var word = wordList[wordIndex];
var wordLength = wordList[wordIndex].length;
var category = wordCategories[wordIndex];
var hint = wordHints[wordIndex];
var lives = 10;

var docCategory = document.getElementById("category");
var docLetterCount = document.getElementById("lettercount");
var docLetterSpace = document.getElementById("letterspace");
var docLives = document.getElementById("lives");
var docHint = document.getElementById("hint");
var docAlphabetLetters = document
    .getElementById("alphabet")
    .getElementsByTagName("button");
var docModal = document.querySelector(".modal");
var docModalWinLose = document.getElementById("modal-text");
var docModalHint = document.getElementById("modal-hint");
var docCloseButton = document.querySelector(".close-button");

function startGame() {
    updateCategory();
    updateLetterCount();
    registerGame();
    updateLives();
    updateLetterSpace();
}

function newGame() {
    refreshWordInfo();
    resetAlphabetLetters();
    updateCategory();
    updateLetterCount();
    registerGame();
    updateLives();
    deleteLetterSpaceText();
    updateLetterSpace();
	resetStickman();
}

function checkLetter(letter) {
    disableButton(letter);
    if (word.includes(letter)) {
        updateLetterSpace(letter);
        if (docLetterSpace.textContent.includes(word)) {
            disableAlphabetLetters();
			modalPopup("win");
        }
    } else {
        --lives;
        updateLives();
        if (lives == 0) {
            disableAlphabetLetters();
			modalPopup("lose");
        }
		updateStickman();
    }
}

function updateLetterSpace(letter = null) {
    if (letter != null) {
        replaceLetterSpace(letter);
    } else {
        for (var i = 0; i < wordLength; ++i) {
            var underscore = document.createTextNode("_");
            docLetterSpace.appendChild(underscore);
        }
    }
}

function replaceLetterSpace(letter) {
    var newStr = docLetterSpace.textContent;
    var indices = findAllIndices(letter);
    for (var i = 0; i < indices.length; ++i) {
        newStr = replaceAt(newStr, indices[i], letter);
    }
    docLetterSpace.textContent = newStr;
}

function findAllIndices(letter) {
    var indices = [];
    for (var i = 0; i < wordLength; ++i) {
        if (letter == word[i]) {
            indices.push(i);
        }
    }
    return indices;
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function disableAlphabetLetters() {
    for (var i = 0; i < docAlphabetLetters.length; ++i) {
        var alphabetLetter = docAlphabetLetters[i];
        alphabetLetter.disabled = true;
    }
}

function resetAlphabetLetters() {
    for (var i = 0; i < docAlphabetLetters.length; ++i) {
        var alphabetLetter = docAlphabetLetters[i];
        alphabetLetter.disabled = false;
        alphabetLetter.className = "alphabet-style";
    }
}

function refreshWordInfo() {
    wordIndex = Math.floor(Math.random() * 29);
    word = wordList[wordIndex];
    wordLength = wordList[wordIndex].length;
    category = wordCategories[wordIndex];
    hint = wordHints[wordIndex];
    docHint.disabled = false;
    docHint.className = "hint-style";
    lives = 10;
}

function disableButton(letter) {
    document.getElementById(letter).disabled = true;
    if (word.includes(letter)) {
        document.getElementById(letter).className = "disabledRight";
    } else {
        document.getElementById(letter).className = "disabledWrong";
    }
}

function updateStickman() {
	switch(lives) {
		case 9:
			document.getElementById("base").classList.toggle("hidden");
			break;
		case 8:
			document.getElementById("stem").classList.toggle("hidden");
			break;
		case 7:
			document.getElementById("top1").classList.toggle("hidden");
			break;
		case 6:
			document.getElementById("top2").classList.toggle("hidden");
			break;
		case 5:
			document.getElementById("head").classList.toggle("hidden");
			break;
		case 4:
			document.getElementById("body").classList.toggle("hidden");
			break;
		case 3:
			document.getElementById("right-arm").classList.toggle("hidden");
			break;
		case 2:
			document.getElementById("left-arm").classList.toggle("hidden");
			break;
		case 1:
			document.getElementById("right-leg").classList.toggle("hidden");
			break;
		case 0:
			document.getElementById("left-leg").classList.toggle("hidden");
	}
}
function resetStickman() {
	var stickmanpieces = document.getElementById("hangman-square").children;
	for (var i=0; i < stickmanpieces.length; ++i) {
		if (!hasClass(stickmanpieces[i], "hidden")) {
			stickmanpieces[i].classList.toggle("hidden");
		}
	}
}
function hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}
function deleteLetterSpaceText() {
    docLetterSpace.innerHTML = "";
}

function showHint() {
    docHint.disabled = true;
    docHint.className = "disabledHint";
    modalPopup("hint");
}

function updateCategory() {
    docCategory.textContent = "category: " + category;
}

function updateLetterCount() {
    docLetterCount.textContent = "number of letters: " + wordLength;
}

function updateLives() {
    
    docLives.textContent = "lives remaining: " + lives;
}
function toggleModal() {
   docModal.classList.toggle("show-modal");
}
function windowOnClick(event) {
   if (event.target === docModal) {
	   toggleModal();
   }
}
function modalPopup(msg) {
	docModalHint.textContent = "";
	docModalWinLose.textContent = "";
	if (msg == "win") {
		docModalWinLose.textContent = "Congratulations, you won :D";
	} else if (msg == "lose") {
		docModalWinLose.textContent = "Sorry, you're out of tries :(";
	} else if (msg == "hint") {
		docModalHint.textContent = hint;
	}
	toggleModal();
}

function registerGame() {
    fetch('sumar/1')
        .then(response => response.json())
        .then(data => console.log('cantidad de juegos: ' + data));
}

window.addEventListener("click", windowOnClick);
docCloseButton.addEventListener("click", toggleModal);

startGame();