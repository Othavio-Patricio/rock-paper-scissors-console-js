


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

        if (playerSelection === undefined) break;
        else {
            const roundResult = playRound(playerSelection, computerSelection)
            console.log(roundResult)
        }
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
}

// Determine the winner
function playRound(playerSelection, computerSelection) {
    let result;
    const playerSelUpper = firstLetterToUppercase(playerSelection)
    const computerSelUpper = firstLetterToUppercase(computerSelection)

    if (playerSelection === computerSelection) {
        result = `It's a draw. Both players choose ${playerSelUpper}.`;
        return result;
    }

    if ((playerSelection === 'rock' && computerSelection === 'scissors')
        || (playerSelection === 'paper' && computerSelection === 'rock')
        || (playerSelection === 'scissors' && computerSelection === 'paper')) {
        result = `You Win! ${playerSelUpper} beats ${computerSelUpper}.`;
        return result;
    }

    result = `You Lose! ${computerSelUpper} beats ${playerSelUpper}.`;
    return result;
}

// Make the first letter of a string capital
function firstLetterToUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
                let conf = confirm("Do you really want to leave the game?")
                if (conf) {
                    // Here you can add anything
                    console.log("Buy buy!")
                    return;
                } else {
                    message = round + "\nSo let's do that! Please enter your option.\nOptions: (rock, paper, scissors)";
                    promptResp = promptReq(message, promptResp)
                }
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

    if (inputStr === null) {
        promptResp.err = "1";
        return promptResp;
    };

    inputStr = inputStr.trim();
    if (inputStr === "") {
        promptResp.err = "2"
        return promptResp;
    }

    inputStr = inputStr.toLowerCase();

    if (inputStr === "help") {
        promptResp.err = ""
        // showHelpMessage()
        return promptResp;

    }
    let check = OPTIONS_ARR.includes(inputStr);

    if (!check) {
        promptResp.err = "3";
    } else {
        promptResp.err = "";
        promptResp.str = inputStr;
    }

    return promptResp;
}

// Generate computer's answer
function computerPlay() {
    return OPTIONS_ARR[Math.floor(Math.random() * 3)];
}





