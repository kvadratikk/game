var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
var backgroundLevel1 = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './img/backgroundLevel1.png',
});
var player = new Player();
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
function animate() {
    backgroundLevel1.draw();
    player.velocity.x = 0;
    if (keys.w.pressed)
        player.velocity.y = -20;
    if (keys.d.pressed)
        player.velocity.x = 5;
    if (keys.a.pressed)
        player.velocity.x = -5;
    player.draw();
    player.update();
    window.requestAnimationFrame(animate);
}
animate();
//# sourceMappingURL=index.js.map