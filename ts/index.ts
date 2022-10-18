const canvas: HTMLCanvasElement = document.querySelector('canvas')
const c: CanvasRenderingContext2D = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let parsedCollisions: number[][]
let collisionBlocks: CollisionBlock[]
let background: Sprite
let doors: Sprite[]
let level = 1
const player = new Player({
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
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level = level === 3 ? 1 : level + 1
            levels[level].init()
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0,
              onComplete: () => {
                player.switchSprite('idleRight')
              },
            })
          },
        })
      },
    },
  },
})

let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel1.png',
      })
      doors = [
        new Sprite({
          position: { x: 785, y: 270 },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 96
      player.position.y = 140

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel2.png',
      })
      doors = [
        new Sprite({
          position: { x: 772, y: 336 },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 750
      player.position.y = 255

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel3.png',
      })
      doors = [
        new Sprite({
          position: { x: 176, y: 335 },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ]
    },
  },
}

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

const overlay = {
  opacity: 0,
}

function animate() {
  window.requestAnimationFrame(animate)

  background.draw()
  doors.forEach((door) => {
    door.draw()
  })

  if (keys.a.pressed || keys.d.pressed) {
    for (let door of doors) {
      if (
        player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
        player.hitbox.position.x >= door.position.x &&
        player.hitbox.position.y + player.hitbox.height >= door.position.y &&
        player.hitbox.position.y <= door.position.y + door.height
      ) {
        door.play()
      } else {
        door.playOff()
      }
    }
  }

  player.handleInput(keys)
  player.draw()
  player.update()

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}

levels[level].init()
animate()
