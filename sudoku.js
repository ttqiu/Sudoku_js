const restart = document.getElementById('replay')
const board = document.querySelector('section')
let boardArray = []

class Row {
  constructor(name) {
    this.name = name
  }
  createRow() {
    const newRow = document.createElement('tr')
    newRow.classList.add('row')
    newRow.setAttribute('id', `row${this.name}`)
    board.append(newRow)
  }
}

class Box {
  constructor(name, row) {
    this.name = name
    this.row = row
  }
  createBox() {
    const newBox = document.createElement('input')
    newBox.classList.add('box')
    newBox.setAttribute('id', this.name)
    newBox.setAttribute('type', 'text')
    newBox.setAttribute('onkeypress', 'return /[1-9]/i.test(event.key)')
    newBox.setAttribute('maxlength', '1')
    this.row.append(newBox)
  }
}

const createGrid = () => {
  for (n = 0; n < 9; n++) {
    const eachRow = new Row(`${n}`)
    eachRow.createRow()
    const row = document.getElementById(`row${n}`)
    for (i = 0; i < 9; i++) {
      const eachBox = new Box(`${i}`, row)
      eachBox.createBox()
    }
  }
}

const easyLevel = [
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
  boardArray = easyLevel
  createGrid()
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

const Duplicates = (array) => {
  return array.filter(
    (currentValue, currentIndex) => array.indexOf(currentValue) !== currentIndex
  )
}

const arrayColumn = (array, column) => array.map((row) => row[column])

const play = () => {
  for (let n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (let i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      box.addEventListener('keypress', function () {
        boardArray[n][i] = parseInt(box.value)
        let rowDuplicate = Duplicates(boardArray[n])
        const column = arrayColumn(boardArray, i)
        let columnDuplicate = Duplicates(column)
        if (
          isNaN(boardArray[n][i]) === false &&
          (rowDuplicate.includes(boardArray[n][i]) ||
            columnDuplicate.includes(boardArray[n][i]))
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
