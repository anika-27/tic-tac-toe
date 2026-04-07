const Gameboard= (() => {                                   // IIFE for Gameboard because we just need one gameboard the whole game
    let slots = new Array(9).fill(null);
    function markSlot(index, letter) {
        if (slots[index] === null) {
            slots[index] = letter;
            return true;
        }
        else {
            alert("SPOT IS FILLED ALREADY DUMBO")
            return false;
        }
    }
    function resetBoard() {
        slots.fill(null);
    }
    return {slots, markSlot, resetBoard}
})()


function createPlayer(name, letter) {                       // factory that creates player objects
    return{name, letter};
}


const Controller= (() => {                                    // IIFE for Controller bc we just need one referee
    const PlayerOne = createPlayer("player1", "x");
    const PlayerTwo = createPlayer("player2", "o");

    let POneScore = 0;
    let PTwoScore = 0;

    let gameOver = false;   

    function reset() {
        gameOver=false;
        isPlayerOneTurn = true;
    }

    let isPlayerOneTurn = true;
    function playTurn(index) {
        let win;
        if (gameOver === true) {
            console.log("Game Over!");
            return "Game Over!";
        }
        if (isPlayerOneTurn === true) {
            let turnResultPOne = Gameboard.markSlot(index, "x");
            if (turnResultPOne == true) {
                isPlayerOneTurn = !isPlayerOneTurn;
                win=checkWin();
                console.log("Player 1 turn has complete successfully.");
                if (win === true) {
                    return "Player 1 WINS! 1 point for Player 1!";
                }
            }
            else {
                console.log("YOUR MOVE WAS NOT VALID")
                return "YOUR MOVE WAS NOT VALID";
            }
        }
        else {
            let turnResultPTwo = Gameboard.markSlot(index, "o");
            if (turnResultPTwo == true) {
                isPlayerOneTurn = true;
                win=checkWin();
                console.log("Player 2 turn has complete successfully.");
                if (win === true) {
                    return "Player 2 WINS! 1 point for Player 2!";
                }
            }
            else {
                console.log("YOUR MOVE WAS NOT VALID")
                return "YOUR MOVE WAS NOT VALID";
            }
        }
        if (win === false && !Gameboard.slots.includes(null)) {
            console.log("It's a TIE! Game Over!");
            gameOver = true;
            return "It's a TIE! Game Over!";
        }
        if (isPlayerOneTurn === true) {
            return "Player 1's turn";
        }
        else {
            return "Player 2's turn";
        }
    }

    function addScore(name) {
        if (name === "player1") {
            POneScore++;
            console.log("Player 1 WINS! 1 point for Player 1!");
            gameOver = true;
        }
        else if (name === "player2"){
            PTwoScore++;
            console.log("Player 2 WINS! 1 point for Player 2!");
            gameOver = true;
        }
    }

    function checkWin() {
        const winCombos = 
            [[0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6]];

        for (let combo of winCombos){
            if (Gameboard.slots[combo[0]] === Gameboard.slots[combo[1]] && Gameboard.slots[combo[1]] === Gameboard.slots[combo[2]] && Gameboard.slots[combo[0]] != null){
                if (Gameboard.slots[combo[0]] === "x") {
                    addScore("player1");
                    return true;
                }
                else {
                    addScore("player2");
                    return true;
                }
            }
        }
        return false;
    }




    return {playTurn, reset}
})()



const board = document.querySelector("#board");


for (let i=0; i<9; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.dataset.index = i;
    square.style.border = "1px solid black";
    square.style.width = "100px";
    square.style.height = "100px";
    board.appendChild(square);
    square.addEventListener("click", () => {
        let returnText = Controller.playTurn(i); 
        square.textContent=Gameboard.slots[i];
        message.textContent=returnText;
    });
}

const reset = document.querySelector("button");
reset.textContent="RESET"
reset.addEventListener("click", () => {
    for (let box of board.querySelectorAll(".square")) {
        box.textContent="";
    }
    Gameboard.resetBoard();
    Controller.reset();
    message.textContent="GAME RESET!";
})








