const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let secretNumber;
let numAttempts;

function askLimit() {
    rl.question("How much attempts do you want? ", attempts => {
        numAttempts = attempts;
        askRange();
    }) 
}

function askRange() {
    
    const minMax = [];

    rl.question("Enter a min number: ", minNumber);

    function minNumber(min) {
        minMax.push(Number(min));
        rl.question("Enter a max number: ", maxNumber);
    }

    function maxNumber(max) {
        minMax.push(Number(max));
        console.log(`I'm thinking of a number between ${minMax[0]} and ${minMax[1]}...`);

        secretNumber = randomInRange(...minMax);
        askGuess();
    }

}

function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function askGuess() {
rl.question("Enter a guess: ", guess => {
        numAttempts--

        if (numAttempts === 0) {
            rl.close();
            console.log("You lose");
        }
        else if (checkGuess(Number(guess))) {
            rl.close();
        }
        else {
            askGuess();
        }
    });
}

function checkGuess(num) {
    if (num > secretNumber) {
        console.log("Too high.");
        return false;
    }
    else if (num < secretNumber) {
        console.log("Too low.");
        return false;
    }
    else {
        console.log("Correct!");
        return true;
    }
}

askLimit()
