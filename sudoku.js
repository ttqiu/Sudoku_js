const restart = document.getElementById('replay')
const board = document.querySelector('section')

class Box {
  constructor(name) {
    this.name = name
  }
  createBox() {
    const b = document.createElement('input')
    b.classList.add('box')
    b.setAttribute('id', this.name)
    b.setAttribute('type', 'text')
    b.setAttribute('onkeypress', 'return /[1-9]/i.test(event.key)')
    b.setAttribute('maxlength', '1')
    board.append(b)
  }
}

for (i = 0; i < 81; i++) {
  const box = new Box(`${i}`)
  box.createBox()
  const bb = document.getElementById(i)
  if (
    box.name === '0' ||
    box.name === '9' ||
    box.name === '18' ||
    box.name === '27' ||
    box.name === '36' ||
    box.name === '45' ||
    box.name === '54' ||
    box.name === '63'
  ) {
    bb.style.borderLeft = '2px solid rgb(19, 6, 6)'
    bb.style.borderRight = '2px solid rgb(19, 6, 6)'
    bb.style.borderTop = '2px solid rgb(19, 6, 6)'
  } else if (
    box.name === '73' ||
    box.name === '74' ||
    box.name === '75' ||
    box.name === '76' ||
    box.name === '77' ||
    box.name === '78' ||
    box.name === '79' ||
    box.name === '80'
  ) {
    bb.style.borderTop = '2px solid rgb(19, 6, 6)'
    bb.style.borderRight = '2px solid rgb(19, 6, 6)'
    bb.style.borderBottom = '2px solid rgb(19, 6, 6)'
  } else if (box.name === '72') {
    bb.style.borderLeft = '2px solid rgb(19, 6, 6)'
    bb.style.borderRight = '2px solid rgb(19, 6, 6)'
    bb.style.borderTop = '2px solid rgb(19, 6, 6)'
    bb.style.borderBottom = '2px solid rgb(19, 6, 6)'
  } else {
    bb.style.borderTop = '2px solid rgb(19, 6, 6)'
    bb.style.borderRight = '2px solid rgb(19, 6, 6)'
  }
}
