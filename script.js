let game = new Game(844, 390)
console.log(game.height, game.width)

let stage = new Stage();
stage.backgroundColor = "skyblue";

let ground = new Sprite();
ground.addCostume("./images/ground.png");
ground.y = stage.height;
ground.layer = 3;

let distance = 0

let acceleration = 0.1

let speed = 5

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
cloud.addCostume('../images/cloud.png')
cloud.hidden = true
cloud.size = 60
cloud.y = stage.height - 350;
cloud.layer = 1

let gameOver = new Sprite()
gameOver.addCostume("../images/gameOver.png")
gameOver.hidden = true
gameOver.layer = 5



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
    if (game.mouseDown(mouse) && isGame == false) {
        isGame = true
        player.hidden = false
        gameOver.hidden = true
        player.y = 0
        player.x = 400
        score = 0
        distance = 0
        acceleration = 0.1
        speed = 5
    }
    ySpeed += 0.8;
    player.y += ySpeed;

    if (player.touchSprite(dino)) {
        isGame = false
        player.hidden = true
        gameOver.hidden = false

    }
}

function playerAnimation() {
    player.nextCostume()
}

function dinoAnimation() {
    dino.nextCostume()
}

function fenceCicle() {
    if (game.getRandom(0, 10 > 3)) {
        let fenceClone = fence.createClone()
        fenceClone.x = stage.width + 50
        fenceClone.hidden = false
        stage.forever(function () {
            fenceClone.x -= speed
            if (fenceClone.touchSprite((dino))) {
                fenceClone.switchCostume(1)
            }
            if (fenceClone.touchSprite((player))) {
                player.x -= speed
            }
            if (fenceClone.x < 0) {
                fenceClone.delete()
                if (isGame == true) {
                    score += 1
                }
            }


        })

    }
}

function bushCicle() {
    if (game.getRandom(0, 1) == 0) {
        let bushClone = bush.createClone()
        bushClone.x = stage.width + 50
        bushClone.hidden = false
        bushClone.forever(function () {
            bushClone.x -= 2
            if (bushClone.x < -150) {
                bushClone.delete()
            }
        })
    }
}

function treeCicle() {
    if (game.getRandom(0, 5) == 0) {
        let treeClone = tree.createClone()
        treeClone.x = stage.width + 50
        treeClone.hidden = false
        treeClone.forever(function () {
            treeClone.x -= 2
            if (treeClone.x < -150) {
                treeClone.delete()

            }
        })
    }
}

function cloudCicle() {
    if (game.getRandom(0, 1) == 0) {
        let cloudClone = cloud.createClone()
        cloudClone.size = game.getRandom(25, 50)
        cloudClone.x = stage.width + 50
        cloudClone.y = game.getRandom(50, stage.height - 380)
        cloudClone.hidden = false

        cloudClone.forever(function () {
            cloudClone.x -= cloudClone.size / 15

            if (cloudClone.x < -150) {
                cloudClone.delete()
            }
        })
    }
}

function drawScore(context) {
    context.font = "50px Arial"
    context.fillStyle = "#212121"
    context.fillText("ваш счет " + score, 50, stage.height - 50)
}

function changeSpeed() {
    distance += 0.1
    speed += distance

}

stage.forever(changeSpeed, 3000)
stage.forever(cloudCicle, 1000)
stage.forever(treeCicle, 1500)
stage.forever(bushCicle, 2000)
stage.forever(playerCicle)
stage.forever(playerAnimation, 50)
stage.forever(dinoAnimation, 100)
stage.forever(fenceCicle, 700)
stage.pen(drawScore, 7)
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