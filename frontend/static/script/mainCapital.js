import {
  sendLetterCapital,
  verifyNewWordCapital,
  getTheNewWordCapital,
  getRealWordCapital,
} from "./apiCapital.js";

// QUANDO DA F5 NA PÁGINA
document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("game_active_capital")) {
    localStorage.setItem("game_active_capital", "true");
  }

  if (!localStorage.getItem("hearts_capital")) {
    localStorage.setItem("hearts_capital", 5);
  }

  if (localStorage.getItem("game_active_capital") === "true") {
    getTheNewWordCapital(true);
    renderHeartsCapital();
    loadUsedLettersCapital();
    createKeyboardCapital();
  }

  if (localStorage.getItem("game_active_capital") === "false") {
    renderHeartsCapital();
    showVictoryCapital(localStorage.getItem("victory_capital"));
    const oldCapitalWord = localStorage.getItem("correct_word_capital");

    if (oldCapitalWord) {
      verifyNewWordCapital(oldCapitalWord, true);
    }
  }
});

// COLOCA OS ESPAÇOS PARA AS LETRAS
export function addLetterSpacesCapital(word) {
  const wordContainer = document.getElementById("wordContainer");

  if (Array.isArray(word)) {
    word.forEach(function (letter, index) {
      let spaceSpan;
      let letterSpan;

      if (letter === " ") {
        letterSpan = document.createElement("span");
        letterSpan.className = "right-letter";
        letterSpan.id = `rightLetter${index}`;
        letterSpan.textContent = " ";

        wordContainer.appendChild(letterSpan);
      } else if (letter === "-") {
        letterSpan = document.createElement("span");
        letterSpan.className = "right-letter";
        letterSpan.id = `rightLetter${index}`;
        letterSpan.textContent = "-";

        wordContainer.appendChild(letterSpan);
      } else if (letter === "*") {
        spaceSpan = document.createElement("span");
        spaceSpan.className = "letter-spaces";
        spaceSpan.id = `letterSpaces${index}`;

        letterSpan = document.createElement("span");
        letterSpan.className = "right-letter";
        letterSpan.id = `rightLetter${index}`;
        letterSpan.textContent = "";

        spaceSpan.appendChild(letterSpan);
        wordContainer.appendChild(spaceSpan);
      }
    });
  }
}

// CARREGA AS LETRAS QUE JÁ FORAM COLOCADAS CORRETAMENTE NA TELA DEPOIS DO F5
export function loadSavedLettersCapital() {
  const savedLetters = localStorage.getItem("correct_letters_capital");

  if (savedLetters) {
    const correctLettersArray = JSON.parse(savedLetters);

    correctLettersArray.forEach((letter, index) => {
      const letterSpan = document.getElementById(`rightLetter${index}`);

      if (letterSpan && letter !== "*") {
        letterSpan.textContent = letter;
      }
    });
  }
}

// COLOCA AS LETRAS NA TELA SIMULTANEAMENTE ENQUANTO JOGA
export function addRightLetterCapital(array, letterPressed) {
  array.forEach(function (letter, index) {
    if (letterPressed === letter) {
      const rightLetter = document.getElementById(`rightLetter${index}`);
      if (rightLetter) {
        rightLetter.textContent = letter;

        rightLetter.classList.remove("zoom-in");
        void rightLetter.offsetWidth;
        rightLetter.classList.add("zoom-in");

        const letterAlreadyUsed = document.getElementById("letterAlreadyUsed");
        letterAlreadyUsed.textContent = "";
      }
    }
  });
  if (!localStorage.getItem("correct_letters_capital").includes("*")) {
    showVictoryCapital("true");
  }
}

const usedLetters = [];
// VERIFICA AS TECLAS QUE O USUARIO APERTA
document.addEventListener("keydown", function (event) {
  if (localStorage.getItem("game_active_capital") === "false") {
    return;
  }
  const keyPressed = event.key;

  if (keyPressed.length === 1 && keyPressed.match(/[a-zA-Z]/)) {
    if (
      !localStorage
        .getItem("used_letters_capital")
        .includes(keyPressed.toUpperCase())
    ) {
      usedLetters.push(keyPressed.toUpperCase());
      localStorage.setItem("used_letters_capital", usedLetters.join(" "));
      sendLetterCapital(keyPressed);
    } else {
      const letterAlreadyUsed = document.getElementById("letterAlreadyUsed");
      letterAlreadyUsed.textContent = "você já usou essa letra";

      letterAlreadyUsed.classList.remove("expand-fade-in");
      void letterAlreadyUsed.offsetWidth;
      letterAlreadyUsed.classList.add("expand-fade-in");

      const usedLettersList = document.getElementById("usedLetters");

      usedLettersList.classList.remove("shake");
      void usedLettersList.offsetWidth;
      usedLettersList.classList.add("shake");
    }
  }
});

// CARREGA AS LETRAS JÁ USADAS PELO USUARIO DEPOIS DO F5
export function loadUsedLettersCapital() {
  if (localStorage.getItem("used_letters_capital")) {
    const storageUsedLetters = localStorage.getItem("used_letters_capital");
    usedLetters.push(...storageUsedLetters.split(" "));

    const usedLetter = document.getElementById("usedLetters");
    if (usedLetter) {
      usedLetter.textContent = storageUsedLetters;
    }
  } else {
    localStorage.setItem("used_letters_capital", "");
  }
}

// SETA O TAMANHO DA PALAVRA DO DIA
export function setWordCapital(wordCripto) {
  addLetterSpacesCapital(wordCripto);
  loadSavedLettersCapital();
}

// DELETAR OS CORAÇÕES
export function lostingHeartsCapital() {
  let hearts = parseInt(localStorage.getItem("hearts_capital"), 10);
  hearts--;
  localStorage.setItem("hearts_capital", hearts);
  for (let i = 1; i <= 5; i++) {
    const heart = document.getElementById(`heart${i}`);
    if (heart) {
      if (i <= hearts) {
        heart.style.display = "inline";
        heart.classList.remove("shake");
        void heart.offsetWidth;
        heart.classList.add("shake");
      } else {
        heart.style.display = "none";
        heart.classList.remove("shake");
        void heart.offsetWidth;
        heart.classList.add("shake");
      }
    }
  }
}

// CONTINUAR DELETADO OS CORAÇÕES DEPOIS DO F5
function renderHeartsCapital() {
  const userHearts = parseInt(localStorage.getItem("hearts_capital"), 10);

  for (let i = 5; i > userHearts; i--) {
    const heart = document.getElementById(`heart${i}`);

    if (heart) {
      heart.style.display = "none";
    }
  }
}

// MOSTRAR VITORIA/DERROTA NA TELA
export async function showVictoryCapital(victory) {
  const resultgame = document.getElementById("resultGame");

  if (victory === "true") {
    resultgame.textContent = "VOCÊ GANHOU!";
    resultgame.classList.remove("fall-from-top");

    void resultgame.offsetWidth;
    resultgame.classList.add("fall-from-top");
    document.getElementById("winSound").play();

    localStorage.setItem("victory_capital", "true");
  } else {
    resultgame.textContent = "VOCÊ PERDEU!";
    resultgame.classList.remove("fall-from-top");

    void resultgame.offsetWidth;
    resultgame.classList.add("fall-from-top");
    const loseSound = document.getElementById("loseSound");
    loseSound.volume = 0.3;
    loseSound.play();

    localStorage.setItem("victory_capital", "false");
  }

  const realWordText = document.getElementById("realWord");
  await getRealWordCapital(true);
  localStorage.setItem("game_active_capital", "false");

  const realWord = localStorage.getItem("correct_word_capital");
  realWordText.textContent = realWord.slice(1, -1);
}

// TECLADO PARA CELULAR
function createKeyboardCapital() {
  const keyboard = document.getElementById("keyboard");
  const alphabet = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Backspace",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "Enter",
  ];

  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const button = document.createElement("button");
    button.className = "key";
    button.textContent = letter;

    if (button.textContent == "Backspace") {
      button.textContent = "⌫";
    }

    if (button.textContent == "Enter") {
      button.textContent = "→";
    }

    button.addEventListener("click", () => {
      button.classList.add("pressed");
      setTimeout(() => button.classList.remove("pressed"), 150);
      if (localStorage.getItem("game_active_capital") === "false") {
        return;
      }
      const keyPressed = letter;

      if (keyPressed.length === 1 && keyPressed.match(/[a-zA-Z]/)) {
        if (
          !localStorage
            .getItem("used_letters_capital")
            .includes(keyPressed.toUpperCase())
        ) {
          usedLetters.push(keyPressed.toUpperCase());
          localStorage.setItem("used_letters_capital", usedLetters.join(" "));
          sendLetter(keyPressed);
        } else {
          const letterAlreadyUsed =
            document.getElementById("letterAlreadyUsed");
          letterAlreadyUsed.textContent = "você já usou essa letra";

          letterAlreadyUsed.classList.remove("expand-fade-in");
          void letterAlreadyUsed.offsetWidth;
          letterAlreadyUsed.classList.add("expand-fade-in");

          const usedLettersList = document.getElementById("usedLetters");

          usedLettersList.classList.remove("shake");
          void usedLettersList.offsetWidth;
          usedLettersList.classList.add("shake");
        }
      }
    });

    keyboard.appendChild(button);
  }
}
