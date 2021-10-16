let nextPlayer = 'X'; // takes a value of either 'X' or 'O' according to the game turns

//initialize the game

// use the value stored in the nextPlayer variable to indicate who the next player is
document.getElementById('next-lbl').innerText = nextPlayer;

//adds 1 if X is in col,row,diag , subtracts 1 if O is in col,row,diag
let col = [0, 0, 0];
let row = [0, 0, 0];
let diag = [0, 0];
let winner;

//This call will create the buttons needed for the gameboard.
createGameBoard()

function createGameBoard()
{   
    // Programatically add a button with square brackets enclosing an empty space to each cell in the gameboard
    for(let i = 1; i <= 9; i++) {
        document.getElementById("c" + i).innerHTML = "<button type=\"button\" id=" + i + ">[ ]</button>";
    }   
}

// Programatically add 'takeCell' as an event listener to all the buttons on the board
let btns = document.querySelectorAll('button');
for (let i=0; i<btns.length; i++)
{
    btns[i].addEventListener('click', (event) => { takeCell(event)});
}

// This function will be used to respond to a click event on any of the board buttons.
function takeCell(event)
{       

    let currentButton = event.target.id - 1;

    btns[currentButton].innerText = nextPlayer;
    btns[currentButton].disabled = "disabled";
    
    let curCol = currentButton % 3;
    let curRow = Math.floor(currentButton / 3);
    
    if(nextPlayer == 'X'){
        //switches to the next player
        nextPlayer = 'O';
        
        //for checking who won
        col[curCol]++;   
        row[curRow]++;
        
        if(curRow === curCol){
            diag[0]++;
        }
        if((curRow + curCol) % 3 === 2){
            diag[1]++;
        }
    } else {
        //switches to the next player
        nextPlayer = 'X';    
        
        //for checking who won
        col[curCol]--;   
        row[curRow]--;
        
        if(curRow === curCol){
            diag[0]--;
        }
        if((curRow + curCol) % 3 === 2){
            diag[1]--;
        }
        
    }
    
    document.getElementById('next-lbl').innerText = nextPlayer;

    /*
        When the button is clicked, the space inside its square brackets is replaced by the value in the nextPlayer before switching it
    */

    // Make sure the button is clickable only once (I didn't mention how to do that, look it up :) )

    // Check if the game is over
    if (isGameOver())
    {   //disables all the buttons 
        for(let i = 0; i < 9; i++) {
            btns[i].disabled = "disabled";
        }
        //lets the users know that the game is over and who wins
        document.getElementById("game-over-lbl").innerHTML ="<h1>Game Over, " + winner + " wins</h1>";
        // let the lable with the id 'game-over-lbl' display the words 'Game Over' inside <h1> element
    }

    // I'll leave declaring the winner for your intrinsic motivation, it's not required for this assignment 
    
}

function isGameOver()
{
// This function returns true if all the buttons are disabled and false otherwise 
    //checks to see which player won or if all the buttons have been pressed    
    if(col[0] == 3 || col[1] == 3 || col[2] == 3 
    || row[0] == 3 || row[1] == 3 || row[2] == 3
    ||diag[0] == 3 ||diag[1] == 3){
        //if x wins end the game 
        winner = "X";
        return true;
    } else if (col[0] == -3 || col[1] == -3 || col[2] == -3 
            || row[0] == -3 || row[1] == -3 || row[2] == -3
            ||diag[0] == -3 ||diag[1] == -3){
        //if O wins end the game
        winner = "O"
        return true;
    } else {
        //checks if all the buttons have been pressed
        for(let i = 0; i < 9; i++) {
            if(!btns[i].disabled){
                //if all the buttons have been pressed nobody wins
                winner = "nobody"
                return false;
            }
        }
        return true;
    }
    
}
