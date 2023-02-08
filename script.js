let currentUser = prompt("Enter your player alias");
alert(`Welcome ${firstLetterToUppercase(currentUser)}`);

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
        console.log(roundResult)
    }
    gameResult(roundsFinished)
}

// Finish the game
function gameResult(roundsFinished) {
    let gameResult = "";
   
    if(roundsFinished<5) {
        gameResult += "\n"
        gameResult += `${firstLetterToUppercase(currentUser)} you escaped the game after round "${roundsFinished}"\n` 
        gameResult += `${firstLetterToUppercase(currentUser)}'s score: ${playerWins} wins. Computer's score: ${computerWins} wins.\n`
    }
    else if (playerWins > computerWins) {
        gameResult = `${firstLetterToUppercase(currentUser)} Wins! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
    }
    else if (playerWins < computerWins) {
        gameResult = `${firstLetterToUppercase(currentUser)} you Lose! Your score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
    }
    else {
        gameResult = `It is a Draw! ${firstLetterToUppercase(currentUser)} score: ${playerWins} wins. Computer's score: ${computerWins} wins.`
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
        result = `${firstLetterToUppercase(currentUser)} Wins! ${playerSelUpper} beats ${computerSelUpper}.`;
        playerWins++;
        return result;
    }

    result = `${firstLetterToUppercase(currentUser)} you Lose! ${computerSelUpper} beats ${playerSelUpper}.`;
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
    const info = '\nOptions: rock, paper, scissors \nType "help" to get instructions'

    while (promptResp.str === "") {
        let message = "Round "+round+"\n";
        switch (promptResp.err) {
            case "1":
                let conf = confirm(`${firstLetterToUppercase(currentUser)} do you really want to leave the game?`)
                if (conf) return;
                else {
                    message += "So let's do that! Please enter your option."+info;
                    promptResp = promptReq(message, promptResp)
                }
                break;
            case "2":
                message += `Come on! ${firstLetterToUppercase(currentUser)} you just need to enter your option in the input box below.`+info;
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
        showHelpMessage()
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

// Help message
function showHelpMessage() {
    let message = "Game information:\n";
    message+='* The game "Rock, Paper, Scissors" has 5 rounds. You play against the computer.\n'
    message+='* The progress of the game is available in the console.\n'
    message+='* To play you need to select one of the following options each round: rock, paper or scissors.\n'
    message+='* Type your selection in the input box and press "OK" button.\n'
    message+='* The computer will select random option by itself.\n'
    message+='* After 5 rpounds you will see the result of the whole game in the console.\n'
    message+="* The game is breathtaking and it's FREE! Enjoy!\n"
    message+="~"

    console.log(message)
}
function overalResults () {
    checkLocalStorage ();
    let overalResult = localStorage.getItem("overalgameResults")
    overalResult = JSON.parse(overalResult)
    if (playerWins > computerWins) {
        overalResult[0]++
    }
    else if (playerWins < computerWins) {
        overalResult[1]++
    }
    else {
        overalResult[2]++
    }
    console.log(`Overal Results for ${currentUser}: \nWins: ${overalResult[0]}, Losses: ${overalResult[1]}, Draws: ${overalResult[2]}`)
    localStorage.setItem("overalgameResults", JSON.stringify(overalResult))
    return overalResult
}
function checkLocalStorage () {
    let overalResult = localStorage.getItem("overalgameResults")
    overalResult = JSON.parse(overalResult)
    const arr = [0,0,0]
    if (!overalResult) {
        localStorage.setItem('overalgameResults', JSON.stringify(arr));
        return
    }
    const winsToInt = parseInt(overalResult[0]);
    const losesToInt = parseInt(overalResult[1]);
    const drawToInt = parseInt(overalResult[2]);
    if (typeof overalResult !== "object" || overalResult.length !== 3 || winsToInt === 'NaN'
    || losesToInt === 'NaN'|| drawToInt === 'NaN') {
        localStorage.setItem('overalgameResults', JSON.stringify(arr));
    }
}

overalResults()




