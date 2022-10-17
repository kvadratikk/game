interface Array<T> {
  parse2D(): Array<number[]>
  createObjectsFrom2D(): CollisionBlock[]
}

Array.prototype.parse2D = function () {
  const rows = []

  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16))
  }

  return rows
}

Array.prototype.createObjectsFrom2D = function () {
  const objects = []

  this.forEach((row: number[], y: number) => {
    row.forEach((symbol, x) => {
      if (symbol === 292 || symbol === 250) {
        objects.push(new CollisionBlock({ position: { x: x * 64, y: y * 64 } }))
      }
    })
  })

  return objects
}
