$(document).ready(function () {
    $("#player").on("click", () => {
        $("#player").remove()
        $("#computer").remove()
        let count = 0
        $(".circle").each(function () {
            $(this).attr("id", count)
            $(this).attr("data-player", 0)
            count++
            $(this).on("click", addColor)
        })
    })

    $("#computer").on("click", () => {
        $("#player").remove()
        $("#computer").remove()
        let count = 0
        $(".circle").each(function () {
            $(this).attr("id", count)
            $(this).attr("data-player", 0)
            count++
            $(this).on("click", playerPlay)
        })
    })

    $("#restart").on("click", () => {
        clearBoard()
        // createButtons()
    })
})
//creation of game board

// const generateBoard = (number) => {
//     for (i = 1; i <= number; i++) {
//         const $circle = $("<div>").addClass("circle")
//         $(".playingBoard").append($circle)
//         $circle.attr("id", i)
//         $circle.attr("data-player", "0")
//             $circle.on("click", addColor)
//             }
//             if(checkWin($circle) != "game continues"){
//                 alert(checkWin())
//     }
// }

// const createButtons = () => {
//     let $player = $("<button>").attr("id","player")
//     let $computer = $("<button>").attr("id","computer")
//     $("#buttons").append($player.text("vs player"))
//     $("#buttons").append($computer.text("vs computer"))
//     $("body").append($("#buttons"))
// }

const clearBoard = () => {
    $(".circle").each(function () {
        $(this).attr("data-player", 0)
        $(this).css("background-color", "white")
    })
    if (computer == -1) {
        computer
    }
}

//add color for vs player
let currentTurn = 1
let player = 1
let colors = {}
colors[-1] = "yellow" //computer is yellow
colors[1] = "red" //player is red

const addColor = (event) => {
    if (isValid($(event.currentTarget).attr("id"))) {
        $(event.currentTarget).css("background-color", colors[player])
        $(event.currentTarget).attr("data-player", player)
        if (checkWin(player)) {
            alert(colors[player] + " has won!")
            player += 1
        }
        player *= -1
    }
}

//add color for vs computer

let computer = -1

const playerPlay = (event) => {
    if (isValid($(event.currentTarget).attr("id"))) {
        $(event.currentTarget).css("background-color", colors[player])
        $(event.currentTarget).attr("data-player", player)
        if (checkWin(player)) {
            alert(colors[player] + " has won!")
        }
    }
    computer = -1
    console.log(`computer: ${computer}`)
    computerPlay()
}

const computerPlay = () => {
    if (computer == -1) {
        for (i = 0; i < 42; i++) {
            let $selectedCircle = $("#" + i)
            let $besideCircle = $("#" + (i - 1))
            if (isValid(($selectedCircle).attr("id"))) {

                $selectedCircle.css("background-color", colors[computer])
                $selectedCircle.attr("data-player", computer)
                if (checkWin(computer)) {
                    alert(colors[computer] + " has won!")
                }

                break;
            }
        }

    } else if (computer == 1) {
        playerPlay()
    }
}

//check near win



//isValid check
const isValid = (n) => {
    let id = parseInt(n)
    if ($("#" + id).attr("data-player") === "0") {
        if (id >= 35) { //isValid does not apply for last row
            return true
        }
        if ($("#" + (id + 7)).attr("data-player") !== "0") { //ensure that the circle below is already colored
            return true
        }
    }
    return false
}

//checkWin condition
const checkWin = (p) => {
    //check rows
    let chain = 0
    for (i = 0; i < 42; i += 7) { // go through each row
        for (j = 0; j < 7; j++) { // each cell within each row
            let cell = $("#" + (i + j)) //sets the current cell
            if (cell.attr("data-player") == p) {
                chain++
            } else {
                chain = 0
            }
            if (chain >= 4) {
                return true
            }
        }
        chain = 0
    }
    //check columns
    chain = 0
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 42; j += 7) {
            let cell = $("#" + (i + j))
            if (cell.attr("data-player") == p) {
                chain++
            } else {
                chain = 0
            }
            if (chain >= 4) {
                return true
            }
        }
        chain = 0
    }

    //check diagonals
    let topLeft = 0
    let topRight = topLeft + 3 //creation of 4x4 square

    for (i = 0; i < 3; i++) { //move down 3 times
        for (j = 0; j < 4; j++) { //move right 4 times
            if ($("#" + topLeft).attr("data-player") == p
                && $("#" + (topLeft + 8)).attr("data-player") == p
                && $("#" + (topLeft + 16)).attr("data-player") == p
                && $("#" + (topLeft + 24)).attr("data-player") == p) {
                return true
            }

            if ($("#" + topRight).attr("data-player") == p
                && $("#" + (topRight + 6)).attr("data-player") == p
                && $("#" + (topRight + 12)).attr("data-player") == p
                && $("#" + (topRight + 18)).attr("data-player") == p) {
                return true
            }
            topLeft++ //move across the columns
            topRight = topLeft + 3
        }
        topLeft = i * 7 + 7 //move down the rows
        topRight = topLeft + 3

    }

    return false
}