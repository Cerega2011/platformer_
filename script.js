let game = new Game(844, 390)
console.log(game.height, game.width)

let stage = new Stage();
stage.backgroundColor = "skyblue";

let ground = new Sprite();
ground.addCostume("./images/ground.png");
ground.y = stage.height;
ground.layer = 3;

let player = new Sprite();
player.addCostume("./images/p1.png");
player.addCostume("./images/p2.png");
player.addCostume("./images/p3.png");
player.addCostume("./images/p4.png");
player.addCostume("./images/p5.png");
player.addCostume("./images/p6.png");
player.addCostume("./images/p7.png");
player.addCostume("./images/p8.png");
player.addCostume("./images/p9.png");
player.addCostume("./images/p10.png");
player.y = 0;
player.x = 400;
player.size = 80;
player.layer = 5;

let dino = new Sprite();
dino.addCostume("./images/d1.png");
dino.addCostume("./images/d2.png");
dino.addCostume("./images/d3.png");
dino.addCostume("./images/d4.png");
dino.addCostume("./images/d5.png");
dino.addCostume("./images/d6.png");
dino.size = 90;
dino.y = stage.height - 190;
dino.x = 105;
dino.layer = 6;

let fence = new Sprite()
fence.addCostume('../images/fence.png')
fence.addCostume('../images/fence-drop.png')
fence.size = 40
fence.y = stage.height - 175
fence.layer = 4
fence.hidden = true

let bush = new Sprite()
bush.addCostume('../images/bush.png')
bush.size = 60
bush.y = stage.height - 200;
bush.hidden = true
bush.layer = 1


let tree = new Sprite()
tree.addCostume('../images/tree.png')
tree.y = stage.height - 232
tree.hidden = true
tree.layer = 2




let cloud = new Sprite()
cloud.addCostume('../images/tree.png')
cloud.hidden = true
cloud.size = 60
cloud.y = stage.height - 350;
cloud.layer = 1

let gameOver = new Sprite()
gameOver.addCostume("../images/gameOver.png")
gameOver.hidden = true

let isJump = false

let ySpeed = 0

let score = 0

let isGame = true

let mouse = new Mouse()

function playerCicle() {
    if (player.touchSprite(ground)) {
        ySpeed = -0.8;
        isJump = false;
    }

    if (game.mouseDown(mouse) && isJump == false) {
        ySpeed = -16;
        isJump = true;
    }
    if (game.keyPressed('space') && isJump == false) {
        ySpeed = -16;
        isJump = true;
    }
    ySpeed += 0.8;
    player.y += ySpeed;
    if (player.touchSprite(dino)) {
        isGame = false
        player.hidden = true
        gameOver = false
    }
}

function playerAnimation() {
    player.nextCostume()
}

function dinoAnimation() {
    dino.nextCostume()
}

stage.forever(playerCicle)
stage.forever(playerAnimation, 50)
stage.forever(dinoAnimation, 100)

game.run()

const downloadButton = document.querySelector(".download-button");
// Установка
let defaultInstallEvent = null;
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    defaultInstallEvent = event;
});
downloadButton.addEventListener("click", (event) => {
    defaultInstallEvent.prompt();
});