var Location = function(row, col){
    this.row = row; // y
    this.col = col;
}

// Enemies our player must avoid
var Enemy = function(loc, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = loc.col;
    this.y = loc.row;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x<505){
        this.x = this.x + 500*dt*this.speed;
    }
    else{
        this.x=0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){
    let location = new Location( (5-0)*83-40 , 2*101);
    Enemy.call(this, location);
    this.sprite = 'images/char-boy.png';
}

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.construtor = Player;
Player.prototype.handleInput = function(key){
    if(key=="down" && this.y<(5*83-40)){
        this.y = this.y + 83;
    } else if(key=="up" && this.y>0){
        this.y = this.y - 83;
    } else if(key=="right" && this.x<4*101){
        this.x = this.x + 101;
    } else if(key=="left" && this.x>0){
        this.x = this.x - 101;
    }
}
Player.prototype.update = function(dt) {/*not auto*/};
Player.prototype.reset = function() {
    let location = new Location( (5-0)*83-40 , 2*101);
    this.x = location.col;
    this.y = location.row; 
};




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var resetEnemies = function () {
    allEnemies = [];
    for(let i = 0; i<3; ++i){
        let location = new Location(getRandomInt(5-4, 5-2)*83-40, 0*101);
        allEnemies.push(new Enemy(location, Math.random()));
    }
}
// Place the player object in a variable called player
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
