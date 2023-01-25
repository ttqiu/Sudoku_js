const restart = document.getElementById('replay')
const check = document.getElementById('check')
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
  [0, 0, 0, 8, 2, 0, 4, 0, 7],
  [0, 0, 0, 0, 0, 7, 0, 0, 6],
  [0, 0, 6, 0, 3, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 5, 0, 0, 0],
  [4, 0, 2, 6, 0, 0, 1, 0, 0],
  [3, 9, 0, 0, 0, 0, 0, 0, 0],
  [0, 5, 0, 7, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 8, 3, 0],
  [0, 0, 0, 0, 0, 8, 6, 0, 2]
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

const rowPositon = (n) => {
  if (n <= 2) {
    rowStart = 0
    rowEnd = 2
  } else if (n < 6 && n > 2) {
    rowStart = 3
    rowEnd = 5
  } else {
    rowStart = 6
    rowEnd = 8
  }
  return [rowStart, rowEnd]
}

const columnPosition = (i) => {
  if (i <= 2) {
    columnStart = 0
    columnEnd = 2
  } else if (i < 6 && i > 2) {
    columnStart = 3
    columnEnd = 5
  } else {
    columnStart = 6
    columnEnd = 8
  }
  return [columnStart, columnEnd]
}

const subgrid = (array, n, i) => {
  let subgridArray = []
  rowStart = rowPositon(n)[0]
  rowEnd = rowPositon(n)[1]
  columnStart = columnPosition(i)[0]
  columnEnd = columnPosition(i)[1]

  for (r = rowStart; r <= rowEnd; r++) {
    for (col = columnStart; col <= columnEnd; col++) {
      subgridArray.push(array[r][col])
    }
  }
  return subgridArray
}

const play = () => {
  for (let n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (let i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      box.addEventListener('keypress', function (e) {
        box.value = e.key
        boardArray[n][i] = parseInt(box.value)
        let rowDuplicate = Duplicates(boardArray[n])
        const column = arrayColumn(boardArray, i)
        let columnDuplicate = Duplicates(column)
        const subgridArray = subgrid(boardArray, n, i)
        let subgridDuplicate = Duplicates(subgridArray)
        if (
          isNaN(boardArray[n][i]) === false &&
          (rowDuplicate.includes(boardArray[n][i]) ||
            columnDuplicate.includes(boardArray[n][i]) ||
            subgridDuplicate.includes(boardArray[n][i]))
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

const checker = (array) => array.every((value) => value === true)

const solveArray = []
const solved = check.addEventListener('click', function () {
  for (let n = 0; n < 9; n++) {
    for (let i = 0; i < 9; i++) {
      let rowDuplicate = Duplicates(boardArray[n])
      const column = arrayColumn(boardArray, i)
      let columnDuplicate = Duplicates(column)
      const subgridArray = subgrid(boardArray, n, i)
      let subgridDuplicate = Duplicates(subgridArray)
      if (
        isNaN(boardArray[n][i]) === false &&
        (!rowDuplicate.includes(boardArray[n][i]) === true ||
          !columnDuplicate.includes(boardArray[n][i]) === true ||
          !subgridDuplicate.includes(boardArray[n][i]) === true)
      ) {
        solveArray.push(true)
      }
    }
  }
  if (solveArray.length === 81 && checker(solveArray) === true) {
    console.log('solved')
  } else {
    console.log('sorry')
  }
})
