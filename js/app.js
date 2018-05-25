
// Enemies instanstiated are here
let allEnemies = [];
// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() * 260) + 50);
    this.x = -150;
    this.y = y;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Any movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Enemies that reach the end of the screen start moving across it again
    if(this.x > 500) {
        this.x = -150;
        this.speed = Math.floor((Math.random() * 260) + 50);
        this.x += this.speed * dt;
    }
    // When enemies and player collide the player goes back to start square
    if(this.x + 80 > player.x && 
        this.x < player.x + 80 && 
        this.y + 30 >  player.y &&
        this.y < player.y + 30) {
        player.x = 200;
        player.y = 395;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create n amount of enemies distributed among three lanes
function createEnemies(n) {
    let y = [60, 140, 225];
    for(let i = 0; i < n; i++) {
        numBugsTop = Math.floor(n/ y.length);
        numBugsMiddle = numBugsTop * 2;
        if(allEnemies.length < numBugsTop) {
            allEnemies[i] = new Enemy(y[0]);
        } else if(allEnemies.length >= numBugsTop && allEnemies.length < numBugsMiddle) {
            allEnemies[i] = new Enemy(y[1]);
        } else if(allEnemies.length >= numBugsMiddle) {
            allEnemies[i] = new Enemy(y[2]);
        }
    }
    
    return allEnemies;
}
// We can choose the amount of enemies we want on-screen
createEnemies(6);

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // Square one/ start square
    this.x = 200;
    this.y = 395;
}
// Update player's position to avoid movements off-screen
Player.prototype.update = function() {
   if(this.x > 395) {
    this.x = 395;
   }

   if(this.x < 0) {
    this.x = 0;
   }

   if(this.y > 395) {
    this.y= 395;
   }

   //When player gets to water wins and gets back to square one
    if(this.y < 0) {
        this.x = 200;
        this.y = 395;
    }
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 85;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 85;
    }
}

// Instantiation of Player
const player = new Player();

// This listens for key presses and sends the keys to 
// Player.handleInput() method
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

