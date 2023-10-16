const gameChoice = document.querySelectorAll(".game_choice");
const game = document.querySelector(".game");
const resultDiv = document.querySelector(".results");
const resultArea = document.querySelectorAll(".resultArea");

const resultWin = document.querySelector(".result_winner");
const resultText = document.querySelector(".result_text");
const celebration = document.querySelector(".celebration");

const playAgain = document.querySelector(".play_again");
const nextBtn = document.querySelector(".next");
const replay = document.querySelector(".replay");

const pcScore = document.querySelector(".com_score");
const userScore = document.querySelector(".user_score");

let pcScoreNo = sessionStorage.getItem('pcScore') || 0;
let userScoreNo = sessionStorage.getItem('userScore') || 0;
updateScores();

const GAMEPOINTS = [
  {
    name: "rock",
    winAgainst: "scissors",
  },
  {
    name: "paper",
    winAgainst: "rock"
  },
  {
    name: "scissors",
    winAgainst: "paper"
  }
];

gameChoice.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = GAMEPOINTS.find((choice) => choice.name === choiceName);
    choose(choice);
  })
});

function choose(choice) {
  const pcchoice = pcchoose();
  displayResults([choice, pcchoice]);
  displayWinner([choice, pcchoice]);
}

function pcchoose() {
  const rand = Math.floor(Math.random() * GAMEPOINTS.length);
  return GAMEPOINTS[rand];
}

function displayWinner(results) {
    const userWin = isWinner(results);
    const pcWin = isWinner(results.reverse());
    if (userWin) {
      resultText.innerText = "YOU WIN AGAINST PC";
      resultArea[0].classList.toggle('winner');
      nextBtn.classList.toggle('hidden');
      userWins();
    }
    else if (pcWin) {
      resultText.innerText = "YOU LOSE AGAINST PC";
      resultArea[1].classList.toggle('winner');
      pcWins();
      nextBtn.classList.add('hidden');
    }
    else {
      resultText.innerText = "TIE UP";
      nextBtn.classList.add('hidden');
    }

  resultWin.classList.toggle('hidden');
  resultDiv.classList.toggle('show');
}

function isWinner(results) {
  return results[0].winAgainst === results[1].name;
}

function displayResults(result) {
  resultArea.forEach((resultDiv, index) => {
      resultDiv.innerHTML = `
          <div class="choice ${result[index].name}">
            <img src="./gameimages/icon-${result[index].name}.png" alt="${result[index].name}" />
          </div> `;
  });
  game.classList.toggle('hidden');
  resultDiv.classList.toggle('hidden');
}

playAgain.addEventListener("click", () => {
    game.classList.toggle('hidden');
    resultDiv.classList.toggle('hidden');

    resultArea.forEach((resultAreaa) => {
      resultAreaa.innerHTML = ""
      resultAreaa.classList.remove("winner");
    })

    resultText.innertext = "";
    resultWin.classList.toggle("hidden");
    resultDiv.classList.toggle("show");
})

function updateScores() {
  pcScore.textContent = pcScoreNo;
  userScore.textContent = userScoreNo;

  sessionStorage.setItem('pcScore', pcScoreNo);
  sessionStorage.setItem('userScore', userScoreNo);
}

function pcWins() {
  pcScoreNo++;
  updateScores();
}

function userWins() {
  userScoreNo++;
  updateScores();
}

nextBtn.addEventListener("click", () => {
  window.location.href = 'victory.html';
});

replay.addEventListener("click", () => {
  celebration.classList.toggle("hidden");
})

let rulesBtn = document.querySelector(".rulesBtn");
let closeBtn = document.querySelector(".closeBtn");
let wordBox = document.querySelector("#wordBox");

rulesBtn.addEventListener("click", () => {
  wordBox.style.display = "block";
});


closeBtn.addEventListener("click", () => {
  wordBox.style.display = "none";
});