import './style-first.css';

document.querySelector('#app').innerHTML = `
    <div class="main">
        <span class="main-inside"></span>
        <span>P</span>
        <span>R</span>
        <span>T</span>
    </div>
`;

// const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVXZWY";
const LETTERS = 'RENAN*ALICE#CECÍLIA';

function hslColor(index, len) {
    let hue = Math.floor((index / len) * 341); // between 0 and 340
    let saturation = 100;
    let lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getString(howLong, string = []) {
    if (howLong == 0) {
        return string;
    }
    let randomIndex = Math.floor(Math.random() * LETTERS.length);
    let letter = LETTERS[randomIndex];
    string.push(letter);
    return getString(howLong - 1, string);
}

var rootElement = document.querySelector('.main-inside');
var insideElements = document.querySelectorAll('.inside');

function createSpan() {
    var texts = getString(1000);
    const div = document.createElement('div');

    for (let i = 0; i < texts.length; i++) {
        var color = hslColor(i, texts.length);
        const span = document.createElement('span');
        span.style.color = color;
        span.innerText = texts[i];
        div.appendChild(span);
    }

    //  for (let text of texts) {
    //      //var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    //      const span = document.createElement('span');
    //      span.style.color = `#${randomColor}`;
    //      span.innerText = text;
    //      div.appendChild(span)
    //  }
    return div;
}

var texts = getString(500);

function flashText2() {
    for (let insideElement of insideElements) {
        for (let text of texts) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            const span = document.createElement('span');
            span.style.color = `#${randomColor}`;
            span.innerText = text;
            insideElement.appendChild(span);
        }
    }
}

//    setInterval(function () {
//        rootElement.innerHTML = '';
rootElement.appendChild(createSpan());
//    }, 300);

//  setInterval(function () {
//      for (let insideElement of insideElements) {
//          insideElement.innerHTML = '';
//          insideElement.appendChild(createSpan());
//      }
//  }, 500);
