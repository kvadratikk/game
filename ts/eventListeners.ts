let click = 0

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'w':
    case 'ц':
    case 'ArrowUp':
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
