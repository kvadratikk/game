var Sprite = (function () {
    function Sprite(_a) {
        var position = _a.position, imageSrc = _a.imageSrc, _b = _a.frameRate, frameRate = _b === void 0 ? 1 : _b, _c = _a.frameBuffer, frameBuffer = _c === void 0 ? 2 : _c, animations = _a.animations, _d = _a.loop, loop = _d === void 0 ? true : _d, _e = _a.autoplay, autoplay = _e === void 0 ? true : _e;
        var _this = this;
        this.position = position;
        this.image = new Image();
        this.image.onload = function () {
            _this.loaded = true;
            _this.width = _this.image.width / _this.frameRate;
            _this.height = _this.image.height;
        };
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        if (this.animations) {
            for (var key in this.animations) {
                var image = new Image();
                image.src = this.animations[key].imageSrc;
                this.animations[key].image = image;
            }
        }
    }
    Sprite.prototype.draw = function () {
        if (!this.loaded)
            return;
        var cropbox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height,
        };
        c.drawImage(this.image, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height);
        this.updateFrames();
    };
    Sprite.prototype.play = function () {
        this.autoplay = true;
    };
    Sprite.prototype.updateFrames = function () {
        var _a;
        if (!this.autoplay)
            return;
        this.elapsedFrames++;
        if (!(this.elapsedFrames % this.frameBuffer)) {
            if (this.currentFrame < this.frameRate - 1)
                this.currentFrame++;
            else if (this.loop)
                this.currentFrame = 0;
        }
        if ((_a = this.currentAnimation) === null || _a === void 0 ? void 0 : _a.onComplete) {
            if (this.currentFrame === this.frameRate - 1 &&
                !this.currentAnimation.isActive) {
                this.currentAnimation.onComplete();
                this.currentAnimation.isActive = true;
            }
        }
    };
    return Sprite;
}());
//# sourceMappingURL=Sprite.js.map