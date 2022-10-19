const canvas: HTMLCanvasElement = document.querySelector('canvas')
const c: CanvasRenderingContext2D = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let parsedCollisions: number[][]
let collisionBlocks: CollisionBlock[] = collisionsLevel1.parse2D().createObjectsFrom2D()
let background: Sprite = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './img/backgroundLevel1.png',
})
let doors: Sprite[] = [
  new Sprite({
    position: { x: 785, y: 270 },
    imageSrc: './img/doorOpen.png',
    frameRate: 5,
    frameBuffer: 5,
    loop: false,
    autoplay: false,
  }),
]
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
            doors = levels[level].doors
            doors[0].playOff()
            background = levels[level].background
            player.position.x = levels[level].playerPosition.x
            player.position.y = levels[level].playerPosition.y
            player.collisionBlocks = levels[level].collisionBlocks
            player.switchSprite('idleRight')
            gsap.to(overlay, {
              opacity: 0,
              onComplete: () => {
                player.preventInput = false
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
    collisionBlocks: collisionsLevel1.parse2D().createObjectsFrom2D(),
    playerPosition: {
      x: 200,
      y: 200,
    },
    background: new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: './img/backgroundLevel1.png',
    }),
    doors: [
      new Sprite({
        position: { x: 785, y: 270 },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false,
      }),
    ],
    init: () => {
      if (player.currentAnimation) player.currentAnimation.isActive = false
    },
  },
  2: {
    collisionBlocks: collisionsLevel2.parse2D().createObjectsFrom2D(),
    playerPosition: {
      x: 96,
      y: 140,
    },
    background: new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: './img/backgroundLevel2.png',
    }),
    doors: [
      new Sprite({
        position: { x: 772, y: 336 },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false,
      }),
    ],
    init: () => {
      if (player.currentAnimation) player.currentAnimation.isActive = false
    },
  },
  3: {
    collisionBlocks: collisionsLevel3.parse2D().createObjectsFrom2D(),
    playerPosition: {
      x: 750,
      y: 255,
    },
    background: new Sprite({
      position: { x: 0, y: 0 },
      imageSrc: './img/backgroundLevel3.png',
    }),
    doors: [
      new Sprite({
        position: { x: 176, y: 335 },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false,
      }),
    ],
    init: () => {
      if (player.currentAnimation) player.currentAnimation.isActive = false
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

  player.draw()
  player.update()

  if (keys.w.pressed) {
    for (let door of doors) {
      if (
        player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
        player.hitbox.position.x >= door.position.x &&
        player.hitbox.position.y + player.hitbox.height >= door.position.y &&
        player.hitbox.position.y <= door.position.y + door.height
      ) {
        player.preventInput = true
        player.velocity.x = 0
        player.velocity.y = 0
        player.switchSprite('enterDoor')
      }
    }
  }

  player.handleInput(keys)

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  c.restore()
}

levels[level].init()
player.collisionBlocks = collisionBlocks
animate()
