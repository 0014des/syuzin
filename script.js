let p1Score = 0;
let p2Score = 0;

let p1Choice = '';
let p2Choice = '';
let round = 1;

const p1ScoreEl = document.getElementById('p1-score');
const p2ScoreEl = document.getElementById('p2-score');
const p1FinalScore = document.getElementById('p1-final-score');
const p2FinalScore = document.getElementById('p2-final-score');
const resultEl = document.getElementById('result');
const p1RadioButtons = document.querySelectorAll('input[name=p1-choice]');
const p2RadioButtons = document.querySelectorAll('input[name=p2-choice]');
const confirmBtn = document.getElementById('confirm');
const nextRoundBtn = document.getElementById('next-round');
const restartBtn = document.getElementById('restart');
const gameOver = document.getElementById('game-over');
const roundEl = document.getElementById('round');

function resetRound(){
  p1Choice = '';
  p2Choice = '';
  
  p1RadioButtons.forEach(radio => radio.checked = false);
  p2RadioButtons.forEach(radio => radio.checked = false);

  resultEl.textContent = "対戦結果";

  confirmBtn.disabled = false;
}

function resolveRound(){
  if (p1Choice === '' ||
      p2Choice === '') return;

  if (p1Choice === 'collaborate' &&
      p2Choice === 'collaborate') {
    p1Score += 2;
    p2Score += 2;
    resultEl.textContent = "両者協力 +2ポイント";

  } else if (p1Choice === 'collaborate' &&
              p2Choice === 'betray') {
    p1Score += 0;
    p2Score += 3;
    resultEl.textContent = "プレイヤー1裏切られて (+0), プレイヤー2裏切って (+3)";

  } else if (p1Choice === 'betray' &&
              p2Choice === 'collaborate') {
    p1Score += 3;
    p2Score += 0;
    resultEl.textContent = "プレイヤー1裏切って (+3), プレイヤー2裏切られて (+0)";

  } else if (p1Choice === 'betray' &&
              p2Choice === 'betray') {
    p1Score += 1;
    p2Score += 1;
    resultEl.textContent = "裏切り同士 +1ポイント";

  }

  p1ScoreEl.textContent = p1Score;
  p2ScoreEl.textContent = p2Score;

  if (round < 10) {
    round++;
    roundEl.textContent = round;
  } else {
    gameOver.classList.remove('hidden');
    p1FinalScore.textContent = p1Score;
    p2FinalScore.textContent = p2Score;

    p1RadioButtons.forEach(radio => radio.disabled = true);
    p2RadioButtons.forEach(radio => radio.disabled = true);
    confirmBtn.disabled = true;
    nextRoundBtn.disabled = true;

    resultEl.textContent += " ゲームオーバー";

  }
}

confirmBtn.addEventListener('click',(e)=>{
  p1RadioButtons.forEach(radio => {
    if(radio.checked) p1Choice = radio.value;
  });
  p2RadioButtons.forEach(radio => {
    if(radio.checked) p2Choice = radio.value;
  });

  if (p1Choice && p2Choice) {
    resolveRound();
    confirmBtn.disabled = true;
  } else {
    alert("プレイヤー1もプレイヤー2も必須です！");
  }
});

// 次のラウンド
nextRoundBtn.addEventListener('click',(e)=>{
  if (round <= 10) {
    resetRound();
  }
});

// ゲーム最初から
restartBtn.addEventListener('click',(e)=>{
  p1Score = 0;
  p2Score = 0;
  round = 1;

  p1ScoreEl.textContent = p1Score;
  p2ScoreEl.textContent = p2Score;
  p1FinalScore.textContent = p1Score;
  p2FinalScore.textContent = p2Score;

  gameOver.classList.add('hidden'); 
  p1RadioButtons.forEach(radio => radio.disabled = false);
  p2RadioButtons.forEach(radio => radio.disabled = false);
  confirmBtn.disabled = false;

  resetRound();
});

// 初期化
resetRound();

