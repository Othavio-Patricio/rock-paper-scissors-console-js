


// Game "rock, paper, scissors" player vs computer
const OPTIONS_ARR = ["rock", "paper", "scissors"];
let computerWins = 0;
let playerWins = 0;
game()


// Run the game
function game() {
    let roundsFinished = 1;
    for (let i = 1; i < 6; i++) {
        const playerSelection = userPlay(i)
        const computerSelection = computerPlay()

        if (playerSelection === undefined) break;

        roundsFinished = i;

        const roundResult = playRound(playerSelection, computerSelection)
        console.log("-"+roundResult+"-")
    }
    
    gameResult(roundsFinished)
}

// Finish the game
function gameResult(roundsFinished) {
    let gameResult = "";

    if(roundsFinished<5) {
        gameResult += "\n"
        gameResult += `You escaped the game after round "${roundsFinished}"\n` 
        gameResult += `Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.\n`
    }
    else if (playerWins > computerWins) {
        gameResult = `You Win! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
    }
    else if (playerWins < computerWins) {
        gameResult = `You Lose! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
    }
    else {
        gameResult = `It is a Draw! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
    }

    gameResult += `\nTo restart the game refresh the page please.`
    console.log("\n"+gameResult)
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
        playerWins++;
        return result;
    }

    result = `You Lose! ${computerSelUpper} beats ${playerSelUpper}.`;
    computerWins++;
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
        let message = "Round "+round+"\n";
        const info = '\nOptions: rock, paper, scissors \nType "help" to get instructions'
        switch (promptResp.err) {
            case "1":
                let conf = confirm("Do you really want to leave the game?")
                if (conf) {
                    // Here you can add anything
                    // console.log("Buy buy!")
                    return;
                } else {
                    message += "So let's do that! Please enter your option."+info;
                    promptResp = promptReq(message, promptResp)
                }
                break;
            case "2":
                message += "Come on! You just need to enter your option in the input box below."+info;
                promptResp = promptReq(message, promptResp)
                break;
            case "3":
                message += "If you keep going with non-existent options, we will never finish the game!"+info;
                promptResp = promptReq(message, promptResp)
                break;
            default:
                message += 'Game "rock, paper, scissors". Please enter your option.'+info;
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





