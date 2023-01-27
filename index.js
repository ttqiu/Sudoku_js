const modal = document.querySelector('.modal')
const instruction = document.querySelector('.instruction')
const closeButton = document.querySelector('.close-button')

const instructionModal = () => {
  modal.classList.toggle('show-modal')
}

const instructionOnClick = (event) => {
  if (event.target === modal) {
    instructionModal()
  }
}

instruction.addEventListener('click', instructionModal)
closeButton.addEventListener('click', instructionModal)
window.addEventListener('click', instructionOnClick)

let on_off = document.querySelector('.music')
let audio = document.querySelector('.musicOn audio')

const music = on_off.addEventListener('click', function () {
  audio.paused ? audio.play() : music_stop()
})

const music_stop = () => {
  audio.pause()
  audio.currentTime = 0
}
