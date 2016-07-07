var score = 0;
var gameOverMessage;
var ctx2;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -(Math.random() * 5) * 101;
    this.y = (Math.floor(Math.random() * 3) + 1) * 75;
    this.height = 40;
    this.width = 60;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + Math.floor(Math.random() * 100) * dt * 8;
    if( this.x >= 505) {
        this.x = -(Math.random() * 1) * 101;
        this.y = (Math.floor(Math.random() * 3) + 1) * 75;
    }
    this.render();
    if ((((this.x < (player.x + player.width)) && ((this.x + this.width) > player.x))) && ((this.y < (player.y + player.height)) && ((this.height + this.y) > player.y))) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '18pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'white';
    var scoreMessage = "Score = " + score;
    ctx.fillText(scoreMessage, 450, 80);
    ctx.strokeText(scoreMessage, 450, 80);
};

Enemy.prototype.reset = function() {
    score = 0;
    gameOverMessage = "You Lost! Better luck next time. Score = " + score;
    messageRender(gameOverMessage);
    gameReset();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 202;
    this.y = 415;
    this.height = 40;
    this.width = 60;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Enemy.prototype);

Player.prototype.constructor = Player;

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    this.render();
    if (this.y == 0) {
        player.reset();
    }
};

Player.prototype.handleInput = function(key) {
    if ((key === "left") && (this.x >= 101)) {
         this.x -= 101;
         keyValue = " ";
    }
    else if ((key === "up") && (this.y >= 83)){
        this.y -= 83;
        keyValue = " ";
    }
    else if ((key === "right") && (this.x <= 303)){
        this.x += 101;
        keyValue = " ";
    }
    else if ((key === "down") && (this.y <= 332)){
        this.y += 83;
        keyValue = " ";
    }
    ctx2.clearRect(0, 0, 900, 900);
    this.update();
};

Player.prototype.reset = function() {
    score += 1;
    gameOverMessage = "You WON! Great Job.Score = " + score;
    messageRender(gameOverMessage);
    gameReset();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var gameReset = function() {
    player.x = 202;
    player.y = 415;
    player.render();
    for( var index = 0; index < allEnemies.length; index ++) {
            allEnemies[index].x = -(Math.random() * 5) * 101;
            allEnemies[index].y = (Math.floor(Math.random() * 3) + 1) * 75;
            allEnemies[index].render();
    }
};

var messageRender = function(message) {
    ctx2 = ctx;
    ctx2.font = '30px Impact';
    ctx2.textAlign = 'center';
    ctx2.strokeStyle = 'black';
    ctx2.lineWidth = 1;
    ctx2.fillStyle = 'white';
    ctx2.fillText(message, 253, 30);
    ctx2.strokeText(message, 253, 30);
};

