var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(_a) {
        var _b = _a.collisionBlocks, collisionBlocks = _b === void 0 ? [] : _b, imageSrc = _a.imageSrc, frameRate = _a.frameRate, animations = _a.animations, loop = _a.loop;
        var _this = _super.call(this, {
            position: { x: 200, y: 200 },
            imageSrc: imageSrc,
            frameRate: frameRate,
            animations: animations,
            loop: loop,
        }) || this;
        _this.velocity = { x: 0, y: 0 };
        _this.gravity = 1;
        _this.collisionBlocks = collisionBlocks;
        _this.sides = {
            bottom: _this.position.y + _this.height,
        };
        return _this;
    }
    Player.prototype.update = function () {
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.applyGravity();
        this.updateHitbox();
        this.checkForVerticalCollisions();
    };
    Player.prototype.handleInput = function (keys) {
        if (this.preventInput)
            return;
        this.velocity.x = 0;
        if (keys.w.pressed && !this.velocity.y) {
            this.velocity.y = -20;
            this.update();
        }
        if (keys.d.pressed) {
            this.lastDirection = 'right';
            this.switchSprite('runRight');
            this.velocity.x = 5;
        }
        else if (keys.a.pressed) {
            this.lastDirection = 'left';
            this.switchSprite('runLeft');
            this.velocity.x = -5;
        }
        else {
            if (this.lastDirection === 'left')
                this.switchSprite('idleLeft');
            else
                this.switchSprite('idleRight');
        }
    };
    Player.prototype.updateHitbox = function () {
        this.hitbox = {
            position: {
                x: this.position.x + 55,
                y: this.position.y + 33,
            },
            width: 50,
            height: 55,
        };
    };
    Player.prototype.applyGravity = function () {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    };
    Player.prototype.checkForHorizontalCollisions = function () {
        for (var _i = 0, _a = this.collisionBlocks; _i < _a.length; _i++) {
            var collisionBlock = _a[_i];
            if (this.hitbox.position.x <=
                collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height) {
                if (this.velocity.x < 0) {
                    var offset = this.hitbox.position.x - this.position.x;
                    this.position.x =
                        collisionBlock.position.x + collisionBlock.width - offset + 0.01;
                    break;
                }
                if (this.velocity.x > 0) {
                    var offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
                    this.position.x = collisionBlock.position.x - offset - 0.01;
                    break;
                }
            }
        }
    };
    Player.prototype.checkForVerticalCollisions = function () {
        for (var _i = 0, _a = this.collisionBlocks; _i < _a.length; _i++) {
            var collisionBlock = _a[_i];
            if (this.hitbox.position.x <=
                collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    var offset = this.hitbox.position.y - this.position.y;
                    this.position.y = collisionBlock.position.y + offset + 0.01;
                    break;
                }
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    var offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = collisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    };
    Player.prototype.switchSprite = function (name) {
        if (this.image === this.animations[name].image)
            return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
    };
    return Player;
}(Sprite));
//# sourceMappingURL=Player.js.map