let canvas = document.getElementById("game-canvas") 
let scoreboard = document.getElementById("scoreboard") 
let ctx = canvas.getContext("2d") 
ctx.scale(blockSideLength, blockSideLength)
let model = new gameModel(ctx)

let score = 0

setInterval(() => {
    newGameState() 
}, gameClock);

let newGameState = () => {
    fullSend() 
    if (model.fallingPiece === null) {
        const rand = Math.round(Math.random() * 6) + 1 
        const newPiece = new Piece(shapes[rand], ctx) 
        model.fallingPiece = newPiece 
        model.moveDown() 
    } else {
        model.moveDown()
    }
}

const fullSend = () => {
    const allFilled = (row) => {
        for (let x of row) {
            if (x === 0) {
                return false
            }
        }
        return true 
    }

    for (let i = 0; i < model.grid.length; i++) {
        if (allFilled(model.grid[i])) {
            score += scoreWorth 
            model.grid.splice(i, 1) 
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0]) 
        }
    }

    scoreboard.innerHTML = "Score: " + String(score)
}

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch(e.key) {
        case "w":
            model.rotate()
            break
        case "d":
            model.move(true)
            break
        case "s":
            model.moveDown()
            break
        case "a":
            model.move(false)
            break
    }
})

function pauseGame() {
    alert('Juego pausado.')
}