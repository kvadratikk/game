class CollisionBlock {
  position: { x: number; y: number }
  width: number
  height: number

  constructor({ position }) {
    this.position = position
    this.width = 64
    this.height = 64
  }
}
