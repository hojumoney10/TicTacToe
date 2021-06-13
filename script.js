window.addEventListener('load', function() {
    let player = true; // O = true, X = false
    let allMoves = [];
    let playerOMoves = [];
    let playerXMoves = [];

    let message = document.querySelector(".message");
    let result = document.querySelector(".result");
    let box = document.querySelector("table");
    let restart = document.getElementById("restart");

    // function for when box is clicked
    box.addEventListener("click", fillBox);

    function fillBox (e) {
        if (allMoves.length <= 8) {
            let id = e.target.id;

            function performAction() {
                const symbol = (player ? "O" : "X");
                
                if (player) {
                    playerOMoves.push(id);
                } else {
                    playerXMoves.push(id);
                }
                allMoves.push(id);
                output(id, symbol);
                message.innerHTML = `Player ${symbol}'s turn`;
                showResult();
            }

            if (document.getElementById(id).innerHTML === "") {
                if (message.innerHTML !== "Congratulations!") {
                    performAction();
                }
            }
        }
    }

    // function to reset game
    restart.addEventListener("click", resetGame);

    function resetGame () {
        allMoves.forEach(x => output(x,""));
        allMoves = [];
        playerOMoves = [];
        playerXMoves = [];
        message.innerHTML = "First move: Player O";
        result.innerHTML = "WINNER:";
    }

    // function to assign value
    function output(id, value) {
        player = !player;
        document.getElementById(id).innerHTML = value;
    }

    // function to show game result
    function showResult () {
        const winCondition = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["3", "5", "7"]
        ];

        for (let i = 0; i < winCondition.length; i++) {
            let isInside = (i, arrToItter) => winCondition[i].every(value => arrToItter.includes(value));
            
            let playerOWin = isInside(i, playerOMoves);
            let playerXWin = isInside(i, playerXMoves);
            
            if (playerOMoves.length == 5 || playerXMoves.length == 5) {
                result.innerHTML = "DRAW";
                message.innerHTML = "Play again!";
            } else if (playerOWin === true || playerXWin === true) {
                result.innerHTML = `WINNER: Player ${playerOWin === true ? "O" : "X"}`;
                message.innerHTML = "Congratulations!";
                break;
            } else {
                result.innerHTML = "WINNER: ";
            }
        }
    }
});