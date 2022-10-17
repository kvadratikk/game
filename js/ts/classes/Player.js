var Player = (function () {
    function Player() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.width = 100;
        this.height = 100;
        this.gravity = 1;
        this.sides = {
            bottom: this.position.y + this.height,
        };
    }
    Player.prototype.draw = function () {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    Player.prototype.update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.sides.bottom = this.position.y + this.height;
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity;
        }
        else
            this.velocity.y = 0;
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map