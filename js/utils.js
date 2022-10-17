Array.prototype.parse2D = function () {
    var rows = [];
    for (var i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16));
    }
    return rows;
};
Array.prototype.createObjectsFrom2D = function () {
    var objects = [];
    this.forEach(function (row, y) {
        row.forEach(function (symbol, x) {
            if (symbol === 292 || symbol === 250) {
                objects.push(new CollisionBlock({ position: { x: x * 64, y: y * 64 } }));
            }
        });
    });
    return objects;
};
//# sourceMappingURL=utils.js.map