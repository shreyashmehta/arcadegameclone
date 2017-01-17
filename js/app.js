var startX = 200;
var startY = 400;

var allEnemies = [];
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

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
    this.x += this.speed * dt;

    //if enemy reaches the last point then it rolls back to original place
    if(this.x > 505) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.x = -200;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = startX;
    this.y = startY;
    this.sprite = "images/char-boy.png";
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y <= 0) {
        this.reset();
    }
};
Player.prototype.reset = function() {
    this.x = startX;
    this.y = startY;
 };

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress === "left") {
        this.x -= 100;
    } if (keyPress === "right") {
        this.x += 100;
    } if (keyPress === "down") {
        this.y += 90;
    } if (keyPress === "up") {
        this.y -= 90;
    }
};

for (var i = 0; i < 3; i++) {
    var enemyX = Math.floor(Math.random() * 30);
    var enemyY = 65 + 80 * i;
    var enemySpeed = Math.floor(Math.random() * 150) + 50;
    allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}

function checkCollisions() {
    for(var i = 0; i < allEnemies.length; i++) {
        if ((allEnemies[i].x) <= player.x + 65 &&
            (allEnemies[i].x + 70) >= (player.x) &&
            (allEnemies[i].y) <= player.y + 35 &&
            (allEnemies[i].y + 35) >= (player.y)) {
            player.reset();
        }
    }
}

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
