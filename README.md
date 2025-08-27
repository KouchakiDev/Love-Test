
---

# Love Test ❤️

A fun, interactive love test webpage built with **HTML, CSS, and JavaScript**. Users answer questions, unlock a gift, and see a sweet love message with hearts animation.

---

**Author**
- **Sobhan Kouchaki — SKD**

---

## How It Works

1. Open `index.html` in a browser.
2. Click **Start Test ❤️**.
3. Answer the questions in the input box.
4. If the answer is correct, hearts appear and you move to the next question.
5. After all questions, a gift appears. Click it to see the final love message.

---

## Config (Easy to Customize)

All questions, messages, and texts are inside the `config` object in the script:

```js
const config = {
  introText: "Welcome to the Love Test!",
  startButtonText: "Start Test ❤️",
  giftMessage: "Correct",
  napentiStory: "I love you forever ❤️",
  questions: [
    {
      position: 1,
      text: "What's our secret love password?",
      answer: ["Love"],
      correctMessage: "Correct! 😍",
      wrongMessages: ["Try again 😉"]
    },
    {
      position: 2,
      text: "Where did we meet first?",
      answer: ["park", "nature park"],
      correctMessage: "Yes, the park!",
      wrongMessages: ["No, think again!"]
    }
  ]
}
```

### You can customize:

* `introText` → text on the intro screen.
* `startButtonText` → button text to start the test.
* `giftMessage` → text under the gift.
* `napentiStory` → final message displayed with typewriter effect.
* `questions` → add, remove, or change questions, answers, and feedback messages.

---

## Features

* Animated background and hearts.
* Typewriter effect for final story.
* Responsive and mobile-friendly.
* Simple configuration via JavaScript object.

---

## Usage

* Open locally in any browser.
* Optional: deploy to **GitHub Pages** to share online.

---

