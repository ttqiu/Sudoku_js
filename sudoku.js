const restart = document.getElementById('replay')
const board = document.querySelector('section')

class Row {
  constructor(name) {
    this.name = name
  }
  createRow() {
    const r = document.createElement('tr')
    r.classList.add('row')
    r.setAttribute('id', `row${this.name}`)
    board.append(r)
  }
}

class Box {
  constructor(name, row) {
    this.name = name
    this.row = row
  }
  createBox() {
    const b = document.createElement('input')
    b.classList.add('box')
    b.setAttribute('id', this.name)
    b.setAttribute('type', 'text')
    b.setAttribute('onkeypress', 'return /[1-9]/i.test(event.key)')
    b.setAttribute('maxlength', '1')
    this.row.append(b)
  }
}

for (n = 0; n < 9; n++) {
  const row = new Row(`${n}`)
  row.createRow()
  const eachRow = document.getElementById(`row${n}`)
  for (i = 0; i < 9; i++) {
    const box = new Box(`${i}`, eachRow)
    box.createBox()
    const bb = document.getElementById(i)
  }
}

const easy = [
  [null, null, null, 2, 6, null, 7, null, 1],
  [null, 6, 8, null, null, 7, null, null, 9],
  [1, 9, null, null, null, 4, 5, null, null],
  [8, 2, null, 1, null, null, null, 4, null],
  [null, null, 4, 6, null, 2, 9, null, null],
  [null, 5, null, null, null, 3, null, 2, 8],
  [null, null, 9, 3, null, null, null, 7, 4],
  [null, 4, null, null, 5, null, null, 3, 6],
  [7, null, 3, null, 1, 8, null, null, null]
]
let boardArray

const start = () => {
  // let boardArry = new Array(81).fill('')
  boardArray = easy
  for (n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      box.value = boardArray[n][i]
      if (box.value != false) {
        box.disabled = true
      }
    }
  }
}
start()
