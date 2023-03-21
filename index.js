const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// console.log(winningPosition);

// let's a create a function to initalise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pr empty b krna hoga boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove('win');
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
}

initGame();
function swapTurn() {
    currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
    // update UI 
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        //for win all boxes should be non-empty and same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && gameGrid[position[1]] === gameGrid[position[2]]) {
            
            // check winner is X
            gameGrid[position[0]] === "X" ? answer = "X" : answer = "O";

            // Disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // we know winner is X/O 
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        
        }
    });

    // It means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    } 

    // when match has tied 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === '') {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo
        swapTurn();
        // check kro win ho gaye ki nhi
        checkGameOver();
    }
}

// check boxes X or O
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

// add event listner on button
newGameBtn.addEventListener('click', initGame);