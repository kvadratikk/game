window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
    case 'ц':
    case 'ArrowUp':
      for (let door of doors) {
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
        }
      }

      keys.w.pressed = true
      break
    case 'a':
    case 'ф':
    case 'ArrowLeft':
      keys.a.pressed = true
      break
    case 'd':
    case 'в':
    case 'ArrowRight':
      keys.d.pressed = true
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
    case 'ц':
    case 'ArrowUp':
      keys.w.pressed = false
      break
    case 'a':
    case 'ф':
    case 'ArrowLeft':
      keys.a.pressed = false
      break
    case 'd':
    case 'в':
    case 'ArrowRight':
      keys.d.pressed = false
      break
  }
})
