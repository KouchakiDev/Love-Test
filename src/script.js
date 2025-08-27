
/* ==========================
   کانفیگ (از روی چیزی که فرستادی)
   همه‌چیز اینجا هست، نیازی به fetch نیست.
   ========================== */
const config = {
  "introText": "This is a Love test maybe you be a losser",
  "startButtonText": "start test ❤️",
  "giftMessage": "Correct",
  "napentiStory": "i love you for ever ❤️",
  "questions": [
    {
      "position": 1,
      "text": "wait wait are you my love? say our secret Love password (write Love)",
      "answer": ["Love"],
      "correctMessage": "Yeahh  well done my love 😍",
      "wrongMessages": [
        "i dont think you are be my love",
        "hey hey this test just for my love",
        "incorrect Try Again"
      ]
    },
    {
      "position": 2,
      "text": "where we see for the First Time?(write park)",
      "answer": ["park", "neture park", "north park", "Star park"],
      "correctMessage": "yeah ofc we meet to park for the first time",
      "wrongMessages": [
        "noooo do you forget taht?  ",
        "that incorrect but dont worry😘"
      ]
    },
    {
      "position": 3,
      "text": "how much i love you? (write Galaxy or 1000 10000)",
      "answer": ["Galaxt"],
      "correctType": "contains",
      "correctKeywords": ["1", "1000", "10000", "A Galaxy ", "100000000", "milion", "bilion"],
      "correctMessage": "Oh yeah i love you so much bigger that",
      "wrongMessages": ["No my love i love you very much", "incorrect but i love you too much"]
    }
  ]
};

/* ==========================
   منطق تست
   ========================== */
let questions = Array.isArray(config.questions) ? config.questions.slice().sort((a,b)=> (a.position||0)-(b.position||0)) : [];
let currentIndex = 0;

/* DOM refs */
const introTextEl = document.getElementById('intro-text');
const startBtn = document.getElementById('start-btn');
const totalNum = document.getElementById('total-num');
const currentNum = document.getElementById('current-num');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const giftImage = document.getElementById('giftImage');
const giftText = document.getElementById('gift-text');
const napentiStoryEl = document.getElementById('napenti-story');

/* init UI */
introTextEl.innerText = config.introText || '';
startBtn.innerText = config.startButtonText || 'start';
totalNum.innerText = questions.length;
giftText.innerText = config.giftMessage || '';

/* events */
startBtn.addEventListener('click', startTest);
submitBtn.addEventListener('click', checkAnswer);
answerInput.addEventListener('keydown', (e)=> { if(e.key==='Enter') checkAnswer(); });
giftImage.addEventListener('click', onGiftClick);
giftImage.addEventListener('keydown', (e)=> { if(e.key==='Enter' || e.key===' ') { e.preventDefault(); onGiftClick(); } });

/* helpers */
function showScreen(id){
  const screens = ['intro-screen','question-screen','gift-screen','napenti-screen'];
  screens.forEach(s => {
    const el = document.getElementById(s);
    if (!el) return;
    if (s === id) { el.classList.remove('hidden'); el.setAttribute('aria-hidden','false'); }
    else { el.classList.add('hidden'); el.setAttribute('aria-hidden','true'); }
  });
}

function normalizeText(s){
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/\u200c/g,'') // zero-width
    .replace(/[^\w\u0600-\u06FF\u0590-\u05FF\s\^\+\*]/g,'') // remove punctuation except some
    .replace(/\s+/g,' ')
    .trim()
    .toLowerCase();
}

function matchesAnswer(userRaw, q){
  const user = normalizeText(userRaw);
  if (!q) return false;

  if (q.correctType && q.correctType === 'contains' && Array.isArray(q.correctKeywords)){
    const uNoSpace = user.replace(/\s+/g,'');
    for (let kw of q.correctKeywords){
      const normalizedKw = normalizeText(kw).replace(/\s+/g,'');
      if (!normalizedKw) continue;
      if (uNoSpace.includes(normalizedKw)) return true;
    }
    // allow patterns like 10^100 (with or without spaces)
    if (/10\s*\^\s*100/.test(userRaw)) return true;
    if (/10\s*به\s*توان\s*100/.test(user)) return true;
    return false;
  }

  if (Array.isArray(q.answer)){
    for (let a of q.answer){
      if (normalizeText(a) === user) return true;
      if (normalizeText(a).replace(/\s+/g,'') === user.replace(/\s+/g,'')) return true;
    }
  } else if (typeof q.answer === 'string'){
    if (normalizeText(q.answer) === user) return true;
    if (normalizeText(q.answer).replace(/\s+/g,'') === user.replace(/\s+/g,'')) return true;
  }

  return false;
}

/* UI actions */
function startTest(){
  currentIndex = 0;
  showScreen('question-screen');
  showQuestion();
}

function showQuestion(){
  const q = questions[currentIndex];
  if (!q) { showGift(); return; }
  currentNum.innerText = (currentIndex + 1);
  questionText.innerText = q.text || '';
  answerInput.value = '';
  feedback.innerText = '';
  setTimeout(()=> answerInput.focus(), 200);
}

function giveHearts(count = 8){
  const container = document.getElementById('hearts-container');
  for (let i=0;i<count;i++){
    const d = document.createElement('div');
    d.className = 'heart';
    d.textContent = '❤️';
    const left = Math.random()*90 + 2;
    d.style.left = left + 'vw';
    d.style.bottom = (-10 - Math.random()*10) + 'px';
    d.style.fontSize = (18 + Math.random()*30) + 'px';
    const duration = 3 + Math.random()*3;
    d.style.animationDuration = duration + 's';
    container.appendChild(d);
    setTimeout(()=> d.remove(), (duration+0.2)*1000);
  }
}

function checkAnswer(){
  const q = questions[currentIndex];
  if (!q) return;
  const user = answerInput.value || '';
  if (user.trim().length === 0){
    feedback.innerText = 'write somthing my love😉';
    return;
  }

  if (matchesAnswer(user, q)){
    // correct
    feedback.innerText = q.correctMessage || 'well done!';
    giveHearts(10);
    setTimeout(()=> {
      currentIndex++;
      if (currentIndex < questions.length) showQuestion();
      else showGift();
    }, 900);
  } else {
    // wrong: show random wrong message; DON'T advance
    const wm = Array.isArray(q.wrongMessages) && q.wrongMessages.length ? q.wrongMessages : ['incorrect but still i love you😘'];
    const pick = wm[Math.floor(Math.random()*wm.length)];
    feedback.innerText = pick;
    // shake input
    answerInput.classList.remove('shake');
    void answerInput.offsetWidth;
    answerInput.classList.add('shake');
    setTimeout(()=> answerInput.classList.remove('shake'), 700);
  }
}

/* show gift (SVG) */
function showGift(){
  showScreen('gift-screen');
  giftImage.style.display = 'block';
  giftImage.setAttribute('tabindex','0');
  giftText.innerText = config.giftMessage || '';
}

/* when gift clicked -> show napenti story with typewriter */
function onGiftClick(){
  showScreen('napenti-screen');
  const story = config.napentiStory || '';
  napentiStoryEl.innerText = '';
  let i=0;
  function step(){
    if (i <= story.length){
      napentiStoryEl.innerText = story.slice(0,i);
      i++;
      setTimeout(step, 18 + Math.random()*30);
    } else {
      // optional final hearts
      giveHearts(18);
    }
  }
  step();
}

/* accessibility: if user clicks Enter on start button, start too */
startBtn.addEventListener('keydown', (e)=> { if (e.key==='Enter' || e.key===' ') { e.preventDefault(); startTest(); } });

/* initial screen */
showScreen('intro-screen');

 