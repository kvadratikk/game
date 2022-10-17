var Sprite = (function () {
    function Sprite(_a) {
        var position = _a.position, imageSrc = _a.imageSrc;
        var _this = this;
        this.position = position;
        this.image = new Image();
        this.image.onload = function () {
            _this.loaded = true;
        };
        this.image.src = imageSrc;
        this.loaded = false;
    }
    Sprite.prototype.draw = function () {
        if (!this.loaded)
            return;
        c.drawImage(this.image, this.position.x, this.position.y);
    };
    return Sprite;
}());
//# sourceMappingURL=Sprite.js.map