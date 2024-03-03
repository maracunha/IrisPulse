import './style-second.css';

let params = new URLSearchParams(document.location.search);
let value = params.get('value');
let color = params.get('colors');
let paramColor = color && `#${color}`;

const ALPHA = value ?? 'ABCDEFGHIJKLMNOPQRSTUVXZWY';

// Helpers
function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createString(howLong: number, string: string[] = []) {
    if (howLong == 0) {
        return string;
    }

    let randomIndex = Math.floor(Math.random() * ALPHA.length);
    let letter = ALPHA[randomIndex];
    string.push(letter);
    return createString(howLong - 1, string);
}

function hslColor(n: number): string {
    let hue = n;
    let saturation = 100;
    let lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function calculateNumberOfItems(
    length: number,
    width: number,
    itemLength: number,
    itemWidth: number,
) {
    var rectangleArea = length * width;
    var itemArea = itemLength * itemWidth;
    var numberOfItems = Math.floor(rectangleArea / itemArea);
    return numberOfItems;
}

// Code HTML

function createSpan(app: HTMLElement): HTMLElement {
    var w = app.clientWidth;
    var h = document.documentElement.clientHeight;
    var n = calculateNumberOfItems(w, h, 35, 72);

    let letters = createString(n + 10);
    const div = document.createElement('div');

    for (let i = 0; i < letters.length; i++) {
        const span = document.createElement('span');
        span.innerText = letters[i];
        div.appendChild(span);
    }
    return div;
}

function startColor(spans: HTMLCollectionOf<HTMLSpanElement>): number[] {
    let intervals = [];
    for (let i = 0; i < spans.length; i++) {
        let id = setInterval(
            function () {
                let color = paramColor ?? hslColor(randomIntFromInterval(0, 300));
                spans[i].style.color = color;
            },
            randomIntFromInterval(200, 500),
        );
        intervals.push(id);
    }
    return intervals;
}

function startLetter(spans: HTMLCollectionOf<HTMLSpanElement>): number[] {
    let intervals = [];

    for (let i = 0; i < spans.length; i++) {
        let id = setInterval(
            function () {
                let letter = ALPHA[randomIntFromInterval(0, ALPHA.length - 1)];
                spans[i].innerText = letter;
            },
            randomIntFromInterval(600, 1000),
        );
        intervals.push(id);
    }

    return intervals;
}

let app = document.querySelector<HTMLDivElement>('#app');
let lettersIntervalIDs: number[] = [];
let colorsIntervalIDs: number[] = [];

function start(): void {
    if (!app) {
        return;
    }

    if (lettersIntervalIDs.length) {
        for (let id of lettersIntervalIDs) {
            clearInterval(id);
        }
    }

    if (colorsIntervalIDs.length) {
        for (let id of colorsIntervalIDs) {
            clearInterval(id);
        }
    }

    app.innerHTML = '';
    const createSpans = createSpan(app);

    app.appendChild(createSpans);

    const spans = app.getElementsByTagName('span');

    colorsIntervalIDs = startColor(spans);
    lettersIntervalIDs = startLetter(spans);
}

start();

window.onresize = start;

function keyEvent(e: KeyboardEvent): void {
    if (e.key == 'Enter') {
        start();
        return;
    }

    if (lettersIntervalIDs.length) {
        for (let id of lettersIntervalIDs) {
            clearInterval(id);
        }
    }

    if (colorsIntervalIDs.length) {
        for (let id of colorsIntervalIDs) {
            clearInterval(id);
        }
    }
}

window.onkeydown = keyEvent;
