$(document).ready(function () {
    generateBoard(42)
})

//creation of game board

const generateBoard = (number) => {
    for (i = 1; i <= number; i++) {
        const $circle = $("<div>").addClass("circle")
        $(".playingBoard").append($circle)
        $circle.attr("id", i)
        $circle.attr("data-player", "0")
            $circle.on("click", addColor)
    }
}

//add color
let currentTurn = 1
const addColor = (event) => {
    if(isValid($(event.currentTarget).attr("id"))) {
        if (currentTurn % 2 === 0) {
            $(event.currentTarget).css("background-color", "red")
            $(event.currentTarget).attr("data-player", "2")
            currentTurn += 1
        } else {
            $(event.currentTarget).css("background-color", "yellow")
            $(event.currentTarget).attr("data-player", "1")
            currentTurn += 1
        }
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
