let p1Score = 0;
let p2Score = 0;

let p1Choice = '';
let p2Choice = '';
let choicesMade = 0;

const p1ScoreEl = document.getElementById('p1-score');
const p2ScoreEl = document.getElementById('p2-score');
const resultEl = document.getElementById('result');
const p1CoopBtn = document.getElementById('p1-coop');
const p1BetrayBtn = document.getElementById('p1-betray');
const p2CoopBtn = document.getElementById('p2-coop');
const p2BetrayBtn = document.getElementById('p2-betray');
const nextRoundBtn = document.getElementById('next-round');

function resetRound(){
  p1Choice = '';
  p2Choice = '';
  choicesMade = 0;

  p1CoopBtn.disabled = false;
  p1BetrayBtn.disabled = false;
  p2CoopBtn.disabled = false;
  p2BetrayBtn.disabled = false;

  resultEl.textContent = "対戦結果";

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
    resultEl.textContent = "プレイヤー1裏切られた (+0), プレイヤー2裏切って (+3)";

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

}

p1CoopBtn.addEventListener('click',(e)=>{
  p1Choice = 'collaborate';
  p1CoopBtn.disabled = true;
  p1BetrayBtn.disabled = true;

  choicesMade++;
  if (choicesMade===2) resolveRound();

});
p1BetrayBtn.addEventListener('click',(e)=>{
  p1Choice = 'betray';
  p1BetrayBtn.disabled = true;
  p1CoopBtn.disabled = true;

  choicesMade++;
  if (choicesMade===2) resolveRound();

});

//プレイヤー2も同様に...
p2CoopBtn.addEventListener('click',(e)=>{
  p2Choice = 'collaborate';
  p2CoopBtn.disabled = true;
  p2BetrayBtn.disabled = true;

  choicesMade++;
  if (choicesMade===2) resolveRound();

});
p2BetrayBtn.addEventListener('click',(e)=>{
  p2Choice = 'betray';
  p2BetrayBtn.disabled = true;
  p2CoopBtn.disabled = true;

  choicesMade++;
  if (choicesMade===2) resolveRound();

});

// 次のラウンド
nextRoundBtn.addEventListener('click',(e)=>{
  resetRound();
});
