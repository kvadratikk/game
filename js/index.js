var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
var parsedCollisions;
var collisionBlocks;
var background;
var doors;
var level = 1;
var player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: function () {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: function () {
                        level = level === 3 ? 1 : level + 1;
                        levels[level].init();
                        player.switchSprite('idleRight');
                        player.preventInput = false;
                        gsap.to(overlay, {
                            opacity: 0,
                        });
                    },
                });
            },
        },
    },
});
var levels = {
    1: {
        init: function () {
            parsedCollisions = collisionsLevel1.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            if (player.currentAnimation)
                player.currentAnimation.isActive = false;
            background = new Sprite({
                position: { x: 0, y: 0 },
                imageSrc: './img/backgroundLevel1.png',
            });
            doors = [
                new Sprite({
                    position: { x: 785, y: 270 },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];
        },
    },
    2: {
        init: function () {
            parsedCollisions = collisionsLevel2.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 140;
            if (player.currentAnimation)
                player.currentAnimation.isActive = false;
            background = new Sprite({
                position: { x: 0, y: 0 },
                imageSrc: './img/backgroundLevel2.png',
            });
            doors = [
                new Sprite({
                    position: { x: 772, y: 336 },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];
        },
    },
    3: {
        init: function () {
            parsedCollisions = collisionsLevel3.parse2D();
            collisionBlocks = parsedCollisions.createObjectsFrom2D();
            player.collisionBlocks = collisionBlocks;
            player.position.x = 750;
            player.position.y = 255;
            if (player.currentAnimation)
                player.currentAnimation.isActive = false;
            background = new Sprite({
                position: { x: 0, y: 0 },
                imageSrc: './img/backgroundLevel3.png',
            });
            doors = [
                new Sprite({
                    position: { x: 176, y: 335 },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ];
        },
    },
};
var keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};
var overlay = {
    opacity: 0,
};
function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    doors.forEach(function (door) {
        door.draw();
    });
    player.handleInput(keys);
    player.draw();
    player.update();
    c.save();
    c.globalAlpha = overlay.opacity;
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
}
levels[level].init();
animate();
//# sourceMappingURL=index.js.map