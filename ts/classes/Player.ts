class Player extends Sprite {
  position: { x: number; y: number }
  velocity: { x: number; y: number }
  width: number
  height: number
  gravity: number
  sides: { bottom: number }
  collisionBlocks: CollisionBlock[]
  hitbox: { position: { x: number; y: number }; width: number; height: number }
  lastDirection: string
  preventInput: boolean

  constructor({
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop,
  }: {
    collisionBlocks?: CollisionBlock[]
    imageSrc: string
    frameRate: number
    loop?: boolean
    animations: {
      idleRight: {}
      idleLeft: {}
      runRight: {}
      runLeft: {}
      enterDoor: {}
    }
  }) {
    super({
      position: { x: 200, y: 200 },
      imageSrc,
      frameRate,
      animations,
      loop,
    })
    this.velocity = { x: 0, y: 0 }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks
    this.sides = {
      bottom: this.position.y + this.height,
    }
  }

  update() {
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x

    this.updateHitbox()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.updateHitbox()

    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )

    this.checkForVerticalCollisions()
  }

  handleInput(keys: {
    a: { pressed: boolean }
    d: { pressed: boolean }
    w: { pressed: boolean }
  }) {
    if (this.preventInput) return
    this.velocity.x = 0

    if (keys.w.pressed && !this.velocity.y) {
      this.velocity.y = -20
      this.update()
    }

    if (keys.d.pressed) {
      this.lastDirection = 'right'
      this.switchSprite('runRight')
      this.velocity.x = 5
    } else if (keys.a.pressed) {
      this.lastDirection = 'left'
      this.switchSprite('runLeft')
      this.velocity.x = -5
    } else {
      if (this.lastDirection === 'left') this.switchSprite('idleLeft')
      else this.switchSprite('idleRight')
    }
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 55,
        y: this.position.y + 33,
      },
      width: 50,
      height: 55,
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForHorizontalCollisions() {
    for (let collisionBlock of this.collisionBlocks) {
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width
          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (let collisionBlock of this.collisionBlocks) {
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + offset + 0.01
          break
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }

  switchSprite(name: string) {
    if (this.image === this.animations[name].image) return

    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameBuffer = this.animations[name].frameBuffer
    this.loop = this.animations[name].loop
    this.currentAnimation = this.animations[name]
  }
}
