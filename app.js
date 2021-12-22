$(document).ready(function(){
generateBoard(42)
})

//creation of game board

const generateBoard = (number) => {
    for (i = 1; i <= number; i++){
        const $circle = $("<div>").addClass("circle")
        $(".playingBoard").append($circle)
        $circle.attr("id", "circle" + i)
    }
}