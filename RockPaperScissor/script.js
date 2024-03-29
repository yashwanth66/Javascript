let userScore = 0;
let compScore = 0;
//Comment line
let userName = prompt('Please, Enter your name:').toUpperCase();

let user = document.getElementById("userName");
user.innerText = userName;

let btn = document.getElementById("button");
let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScorePara = document.getElementById("userScore"); 
let compScorePara = document.getElementById("compScore"); 
//drawGame function
const drawGame = () => {
    msg.innerText = "Game was Draw!!!";
    msg.style.backgroundColor = "blue";
}


//Generator
const generateCompChoice = () => {
    let options = ['rock','scissor','paper'];
    return options[Math.floor(Math.random()*3)]
};


//Display output
const showWinner = (userChoice, compChoice, userWin) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win, Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = userScore;
        msg.innerText = `You Lost, ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};




//playGame function
const playGame = (userChoice) => {
    const compChoice = generateCompChoice();
    
    if(userChoice === compChoice){
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === 'rock'){
            // scissor, paper
            userWin = compChoice === 'paper'? false : true;
        }else if(userChoice === 'paper'){
            //rock, scissor
            userWin = compChoice === 'scissor'? false : true;
        }else{
            //rock, paper
            userWin = compChoice === 'rock'? false : true;
        }
        showWinner(userChoice, compChoice, userWin);
    }
};



choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log(userChoice);
        playGame(userChoice);
    })
});


btn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    msg.innerText = "Result";
    msg.style.backgroundColor = "black";
});
