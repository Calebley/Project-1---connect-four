$(document).ready(function () {
    let count = 0
    $(".circle").each(function () {
        $(this).attr("id", count)
        $(this).attr("data-player", 0)
        count++
        $(this).on("click", addColor)
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

//add color
let currentTurn = 1
let player = 1
let winner = 0
let colors = {}
colors[-1] = "yellow"
colors[1] = "red"

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


//isValid check
const isValid = (n) => {
    let id = parseInt(n)
    if ($("#" + id).attr("data-player") === "0") {
        if (id >= 35) {
            return true
        }
        if ($("#" + (id + 7)).attr("data-player") !== "0") {
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

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
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
            topLeft++
            topRight = topLeft + 3
        }
        topLeft = i * 7 + 7
        topRight = topLeft + 3

    }

    return false
}