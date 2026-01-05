document.addEventListener('DOMContentLoaded', () => {

    const playBtn = document.getElementById('playBtn');
    const frontPage = document.querySelector('.front-container');
    const categoryPage = document.querySelector('.category-container');
    const gamePage = document.getElementById('gamePage');
    const categoryButtons = document.querySelectorAll('.category-btn');

    const gameCategoryTitle = document.getElementById('gameCategoryTitle');
    const scrambledWord = document.getElementById('scrambledWord');
    const answerInput = document.getElementById('answerInput');
    const submitBtn = document.getElementById('submitBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentScore = document.getElementById('currentScore');
    const livesDisplay = document.getElementById("currentLives");

    const WORDS = {
    HTML: [
        { word: "element", def: "A building block of an HTML document." },
        { word: "doctype", def: "Declaration that tells the browser which HTML version is used." },
        { word: "attribute", def: "Extra information added inside an HTML tag." },
        { word: "metadata", def: "Data describing other data, shown inside <head>." },
        { word: "paragraph", def: "Block of text defined with <p>." }
    ],
    CSS: [
        { word: "selector", def: "Pattern used to target HTML elements." },
        { word: "margin", def: "Space outside an element's border." },
        { word: "padding", def: "Space inside an element's border." },
        { word: "flexbox", def: "Layout model for aligning items in a container." },
        { word: "stylesheet", def: "File containing CSS code." }
    ],
    JavaScript: [
        { word: "variable", def: "A container used to store data values." },
        { word: "function", def: "Reusable block of code that performs an action." },
        { word: "object", def: "A structured data type with properties and values." },
        { word: "callback", def: "A function passed into another function as an argument." },
        { word: "boolean", def: "A data type that can be true or false." }
    ],
    "General IT": [
        { word: "hardware", def: "Physical components of a computer." },
        { word: "software", def: "Programs that run on a computer." },
        { word: "network", def: "System connecting computers to share data." },
        { word: "database", def: "Organized collection of structured data." },
        { word: "bandwidth", def: "Maximum data transfer rate of a network." }
    ]
};


    let selectedCategory = null;
    let score = 0;
    let currentWord = "";
    let lives = 3;

    playBtn.addEventListener('click', () => {
        frontPage.style.display = 'none';
        categoryPage.style.display = 'block';
    });

    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedCategory = btn.innerText.trim();
            startGame();
        });
    });

    function startGame() {
    document.querySelector(".category-container").style.display = "none";
    document.querySelector("#gamePage").style.display = "block";

    document.getElementById("gameCategoryTitle").innerText = selectedCategory;
    lives = 3;
    livesDisplay.innerText = lives;
    loadWord(); // <<< MOST IMPORTANT
    }


    function loadWord() {
    const scrambledWord = document.getElementById("scrambledWord");
    const definitionBox = document.getElementById("wordDefinition");
    const input = document.getElementById("answerInput");

    // STOP if category missing
    if (!selectedCategory || !WORDS[selectedCategory]) {
        scrambledWord.innerText = "Error: No category";
        return;
    }

    const list = WORDS[selectedCategory];
    const item = list[Math.floor(Math.random() * list.length)];

    currentWord = item.word;

    scrambledWord.innerText = scramble(currentWord);
    definitionBox.innerText = item.def;

    input.value = "";
    input.focus();
}


    function scramble(word) {
        return word.split("").sort(() => 0.5 - Math.random()).join("");
    }

    nextBtn.addEventListener("click", checkAnswer);

    answerInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
    });
    
    function checkAnswer() {
    const playerAnswer = answerInput.value.trim().toLowerCase();

    if (playerAnswer === currentWord.toLowerCase()) {
        alert("Correct!");
        loadWord();
    } else {
        lives--;
        livesDisplay.innerText = lives;

        if (lives <= 0) {
            alert("Game Over! You lost all lives.");
            lives = 3;
            livesDisplay.innerText = lives;
            score = 0;
            currentScore.innerText = score;
            categoryPage.style.display = "block";
            gamePage.style.display = "none";
            return;
        } else {
            alert("Incorrect!");
        }
    }

    answerInput.value = "";
}

});
