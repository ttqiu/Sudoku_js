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
