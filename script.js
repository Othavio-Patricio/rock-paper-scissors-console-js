// Game "rock, paper, scissors" player vs computer
const OPTIONS_ARR = ["rock", "paper", "scissors"];
let computerWins = 0;
let playerWins = 0;
game()

// Run the game
function game() {
    for (let i = 1; i < 6; i++) {
        const round = 'Round ' + i;
        const playerSelection = userPlay(round)
        const computerSelection = computerPlay()

        const roundResult = playRound(playerSelection, computerSelection)
        console.log(roundResult)
    }

    gameResult()
}

// Finish the game
function gameResult() {
    let gameResult;
    let message;

    if (playerWins > computerWins) {
        gameResult = `You Win! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
        message = "You are a lucky fellow. Let me win back.";
    }
    else if (playerWins < computerWins) {
        gameResult = `You Lose! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
        message = "I'm generous - I'll give you the opportunity to recoup. Again?"
    }
    else {
        gameResult = `It is a Draw! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
        message = "Only one will remain! Again?"
    }

    console.log("----------------------------------")
    console.log(gameResult)

    setTimeout(() => {
        oneMoreGame(message)
    }, 1000)
}

// Determine the winner
function playRound(playerSelection, computerSelection) {
    let result;
    switch (playerSelection) {
        case "rock":
            if (computerSelection === "scissors") {
                result = "You Win! Rock beats Scissors."
                playerWins++;
            } else if (computerSelection === "paper") {
                result = "You Lose! Paper beats Rock."
                computerWins++;
            } else {
                result = "It's a Draw! Rock can't beat Rock.";
            }
            break;
        case "paper":
            if (computerSelection === "rock") {
                result = "You Win! Paper beats Rock."
                playerWins++;
            } else if (computerSelection === "scissors") {
                result = "You Lose! Scissors beats Paper.";
                computerWins++;
            } else {
                result = "It's a Draw! Paper can't beat Paper.";
            }
            break;
        case "scissors":
            if (computerSelection === "paper") {
                result = "You Win! Scissors beats Paper."
                playerWins++;
            } else if (computerSelection === "rock") {
                result = "You Lose! Rock beats Scissors.";
                computerWins++;
            } else {
                result = "It's a Draw! Scissors can't beat Scissors."
            }
            break;
    }

    return result;
}

// Get right input from player
function userPlay(round) {
    let promptResp = {
        "err": "",
        'str': ""
    };

    while (promptResp.str === "") {
        let message = "";
        switch (promptResp.err) {
            case "1":
                message = round + "\nDon't do that! Let's play! Please enter your option.\nOptions: (rock, paper, scissors)";
                promptResp = promptReq(message, promptResp)
                break;
            case "2":
                message = round + "\nCome on! You just need to enter your option in the input box below.\nOptions: (rock, paper, scissors)";
                promptResp = promptReq(message, promptResp)
                break;
            case "3":
                message = round + "\nIf you keep going with non-existent options, we will never finish the game!\nOptions: (rock, paper, scissors)";
                promptResp = promptReq(message, promptResp)
                break;
            default:
                message = round + '\nGame "rock, paper, scissors". Please enter your option.\nOptions: (rock, paper, scissors)';
                promptResp = promptReq(message, promptResp)
        }
    }

    return promptResp.str;
}

//  Player's input implementation
function promptReq(message, promptResp) {
    let inputStr = prompt(message, "")

    if (inputStr === null) promptResp.err = "1";
    else {
        inputStr = inputStr.trim();

        if (inputStr === "") promptResp.err = "2";
        else {
            inputStr = inputStr.toLowerCase()
            let check = OPTIONS_ARR.includes(inputStr);

            if (!check) promptResp.err = "3";
            else {
                promptResp.err = "";
                promptResp.str = inputStr;
            }
        }
    }

    return promptResp;
}

// Generate computer's answer
function computerPlay() {
    return OPTIONS_ARR[Math.floor(Math.random() * 3)];
}


// Start one more game
function oneMoreGame(message) {
    let conf = confirm(message)

    if (conf) document.location.reload()
    else {
        setTimeout(() => {
            oneMoreGame("Psst...Hey, you. What about a game with a very kind computer?")
        }, 3000)
    }
}



