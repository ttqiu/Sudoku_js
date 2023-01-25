const restart = document.getElementById('replay')
const board = document.querySelector('section')
let boardArray = []

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

const grid = () => {
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
}

const easy = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [0, 6, 8, 0, 0, 7, 0, 0, 9],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0]
]

const start = () => {
  // let boardArry = new Array(81).fill('')
  boardArray = easy
  grid()
  for (n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      if (boardArray[n][i] !== 0) {
        box.value = boardArray[n][i]
        // box.innerText = parseInt(box.value)
        box.disabled = true
      }
    }
  }
}
start()

function Duplicates(array) {
  return array.filter(
    (currentValue, currentIndex) => array.indexOf(currentValue) !== currentIndex
  )
}

const arrayColumn = (array, n) => array.map((x) => x[n])

const play = () => {
  for (let n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (let i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      box.addEventListener('keypress', function () {
        boardArray[n][i] = parseInt(box.value)
        let rowD = Duplicates(boardArray[n])
        const col = arrayColumn(boardArray, i)
        let colD = Duplicates(col)
        if (
          isNaN(boardArray[n][i]) === false &&
          (rowD.includes(boardArray[n][i]) || colD.includes(boardArray[n][i]))
        ) {
          box.style.backgroundColor = 'red'
        } else {
          box.style.backgroundColor = 'white'
        }
      })
    }
  }
}
play()
