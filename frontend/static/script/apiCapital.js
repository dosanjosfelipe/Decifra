import {
  addRightLetterCapital,
  setWordCapital,
  loadSavedLettersCapital,
  loadUsedLettersCapital,
  addLetterSpacesCapital,
  lostingHeartsCapital,
  showVictoryCapital,
} from "./mainCapital.js";

// PEGAR A PALAVRA VERDADEIRA
export async function getRealWordCapital() {
  const URL = "https://decifra-backend-producao.onrender.com/realWordCapital";

  if (!localStorage.getItem("correct_word_capital").includes("*")) return;

  try {
    const resp = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (resp.status === 200) {
      const data = await resp.json();
      localStorage.setItem("correct_word_capital", JSON.stringify(data.word));
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}

// VERIFICA SE TEM NOVA PALAVRA
export async function verifyNewWordCapital(oldWord) {
  const URL = "https://decifra-backend-producao.onrender.com/verifyWord";
  const data = oldWord.slice(1, -1);

  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldWord: data, isCapital: true }),
    });

    if (resp.status === 200) {
      const recievedData = await resp.json();

      if (recievedData.hasNewWord) {
        localStorage.removeItem("correct_letters_capital");
        localStorage.removeItem("correct_word_capital");
        localStorage.removeItem("hearts_capital");
        localStorage.removeItem("used_letters_capital");
        localStorage.removeItem("game_active_capital");
        location.reload();
      } else {
        loadUsedLettersCapital();
        addLetterSpacesCapital(oldWord);
        loadSavedLettersCapital();
      }
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}

// PEGA NOVA PALAVRA
export async function getTheNewWordCapital() {
  let savedWord = localStorage.getItem("correct_word_capital");

  if (savedWord != null) {
    try {
      const parsedWord = JSON.parse(savedWord);
      setWordCapital(parsedWord);
      return;
    } catch {
      localStorage.removeItem("correct_word_capital");
    }
  }

  const URL = "https://decifra-backend-producao.onrender.com/cryptWord";

  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCapital: true }),
    });

    if (resp.status === 200) {
      const data = await resp.json();
      localStorage.setItem(
        "correct_word_capital",
        JSON.stringify(data.cryptWord)
      );
      setWordCapital(data.cryptWord);
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}

// ENVIA LETRA
export async function sendLetterCapital(letter) {
  const URL = "https://decifra-backend-producao.onrender.com/letter";
  const data = letter.toUpperCase();

  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ letter: data, isCapital: true }),
    });

    if (resp.status === 200) {
      const data2 = await resp.json();
      const exist = data2.exist;

      document.getElementById("usedLetters").textContent = localStorage.getItem(
        "used_letters_capital"
      );

      if (exist) {
        const newCorrectArray = data2.newCorrectArray;
        let savedCorrect =
          JSON.parse(localStorage.getItem("correct_letters_capital")) || [];

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

        localStorage.setItem(
          "correct_letters_capital",
          JSON.stringify(savedCorrect)
        );
        addRightLetterCapital(newCorrectArray, data);
      } else {
        lostingHeartsCapital();
        if (localStorage.getItem("hearts_capital") == 0)
          showVictoryCapital("false");
      }
    }
  } catch (error) {
    alert("ERRO: " + error.message);
  }
}
