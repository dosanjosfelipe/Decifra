import {
  addRightLetter,
  setWord,
  loadSavedLetters,
  loadUsedLetters,
  addLetterSpaces,
  maskWord,
  lostingHearts,
  showVictory,
} from "./main.js";

// PEGAR A PALAVRA VERDADEIRA DEPOIS QUE O JOGO ACABOU
export async function getRealWord() {
  const URL = "https://decifra-backend-producao.onrender.com/realWord";

  if (!localStorage.getItem("correct_word").includes("*")) return;

  try {
    const resp = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (resp.status === 200) {
      const data = await resp.json();
      localStorage.setItem("correct_word", JSON.stringify(data.word));
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}

// VERIFICA SE TEM UMA PALAVRA NOVA
export async function verifyNewWord(oldWord) {
  const URL = "https://decifra-backend-producao.onrender.com/verifyWord";
  const data = oldWord.slice(1, -1);

  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldWord: data, isCapital: false }),
    });

    if (resp.status === 200) {
      const recievedData = await resp.json();

      if (recievedData.hasNewWord) {
        localStorage.removeItem("correct_letters");
        localStorage.removeItem("correct_word");
        localStorage.removeItem("hearts");
        localStorage.removeItem("used_letters");
        localStorage.removeItem("game_active");
        location.reload();
      } else {
        loadUsedLetters();
        addLetterSpaces(maskWord(oldWord));
        loadSavedLetters();
      }
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}

// PEGA A NOVA PALAVRA
export async function getTheNewWord() {
  let savedWord = localStorage.getItem("correct_word");

  if (savedWord != null) {
    try {
      const parsedWord = JSON.parse(savedWord);
      setWord(parsedWord);
      return;
    } catch {
      localStorage.removeItem("correct_word");
    }
  }

  const URL = "https://decifra-backend-producao.onrender.com/cryptWord";

  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCapital: false }),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      localStorage.setItem("correct_word", JSON.stringify(data.cryptWord));
      setWord(data.cryptWord);
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}

// ENVIA LETRA
export async function sendLetter(letter) {
  const URL = "https://decifra-backend-producao.onrender.com/letter";
  const data = letter.toUpperCase();

  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ letter: data, isCapital: false }),
    });

    if (resp.status === 200) {
      const data2 = await resp.json();
      const exist = data2.exist;

      document.getElementById("usedLetters").textContent =
        localStorage.getItem("used_letters");

      if (exist) {
        const newCorrectArray = data2.newCorrectArray;
        let savedCorrect =
          JSON.parse(localStorage.getItem("correct_letters")) || [];

        if (
          !Array.isArray(savedCorrect) ||
          savedCorrect.length !== newCorrectArray.length
        ) {
          savedCorrect = newCorrectArray.map((char) =>
            char === " " || char === "-" ? char : "*"
          );
        }

        newCorrectArray.forEach((char, idx) => {
          if (char !== "*") savedCorrect[idx] = char;
        });

        localStorage.setItem("correct_letters", JSON.stringify(savedCorrect));
        addRightLetter(newCorrectArray, data);
      } else {
        lostingHearts();
        if (localStorage.getItem("hearts") == 0) showVictory("false");
      }
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}
