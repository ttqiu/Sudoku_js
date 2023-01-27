const restart = document.getElementById('replay')
const check = document.getElementById('check')
const board = document.querySelector('.board')
const solvedMessage = document.querySelector('.solve')
// const solveButton = document.getElementById('solve-answer')

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

const emptyGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const Duplicates = (array) => {
  return array.filter(
    (currentValue, currentIndex) => array.indexOf(currentValue) !== currentIndex
  )
}

const arrayColumn = (array, column) => array.map((row) => row[column])

const arrayPositon = (n, i) => {
  rowStart = 3 * Math.floor(n / 3)
  columnStart = 3 * Math.floor(i / 3)
  rowEnd = 2 + 3 * Math.floor(n / 3)
  columnEnd = 2 + 3 * Math.floor(i / 3)
  return [rowStart, rowEnd, columnStart, columnEnd]
}

const subgrid = (array, n, i) => {
  let subgridArray = []
  rowStart = arrayPositon(n, i)[0]
  rowEnd = arrayPositon(n, i)[1]
  columnStart = arrayPositon(n, i)[2]
  columnEnd = arrayPositon(n, i)[3]

  for (r = rowStart; r <= rowEnd; r++) {
    for (col = columnStart; col <= columnEnd; col++) {
      subgridArray.push(array[r][col])
    }
  }
  return subgridArray
}

const valid = (boardArray, n, i) => {
  let rowDuplicate = Duplicates(boardArray[n])
  const column = arrayColumn(boardArray, i)
  let columnDuplicate = Duplicates(column)
  const subgridArray = subgrid(boardArray, n, i)
  let subgridDuplicate = Duplicates(subgridArray)
  if (
    rowDuplicate.includes(boardArray[n][i]) ||
    columnDuplicate.includes(boardArray[n][i]) ||
    subgridDuplicate.includes(boardArray[n][i])
  ) {
    return false
  } else {
    return true
  }
}

const randomlize = (board) => {
  for (let n = 0; n < 9; n++) {
    const rndRange = Math.floor(Math.random() * 3) + 3
    for (let i = 0; i <= rndRange; i++) {
      const rndBox = Math.floor(Math.random() * 8)
      const rndNumber = Math.floor(Math.random() * 9) + 1
      board[n][rndBox] = rndNumber
      if (valid(board, n, rndBox) === false) {
        board[n][rndBox] = 0
      }
    }
  }
  return board
}

function solveSudoku() {
  let board = randomlize(emptyGrid)
  let board1 = JSON.parse(JSON.stringify(board))
  while (dfs(board) != true) {
    board = randomlize(emptyGrid)
    board1 = JSON.parse(JSON.stringify(board))
  }
  return [board, board1]
}

function dfs(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        for (let l = 1; l < 10; l++) {
          board[i][j] = l
          if (valid(board, i, j) === true) {
            if (dfs(board)) return true
          }
        }
        board[i][j] = 0
        return false
      }
    }
  }
  return true
}

const solveProve = solveSudoku()
const answerBoard = solveProve[0]
const startBoard = solveProve[1]
console.log(answerBoard, startBoard)

// const solveAnswer = solveButton.addEventListener('click', function () {
//   boardArray = answerBoard
// })

// const hideValueBoard = (board) => {
//   for (let n = 0; n < 9; n++) {
//     const rndRange = Math.floor(Math.random() * 2) + 5
//     for (let i = 0; i <= rndRange; i++) {
//       const rndBox = Math.floor(Math.random() * 8)
//       board[n][rndBox] = 0
//     }
//   }
//   return board
// }

const start = (board) => {
  createGrid()
  boardArray = board
  for (n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      if (boardArray[n][i] !== 0) {
        box.value = boardArray[n][i]
        box.disabled = true
      }
    }
  }
}
start(startBoard)

const play = () => {
  for (let n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (let i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      box.addEventListener('keypress', function (e) {
        box.value = e.key
        boardArray[n][i] = parseInt(box.value)
        if (
          isNaN(boardArray[n][i]) === false &&
          valid(boardArray, n, i) === false
        ) {
          box.style.color = 'red'
        } else {
          box.style.color = 'black'
        }
      })
    }
  }
}
play()

const checker = (array) => array.every((value) => value === true)

const solved = check.addEventListener('click', function () {
  const solveArray = []
  for (let n = 0; n < 9; n++) {
    for (let i = 0; i < 9; i++) {
      valid(boardArray, n, i)
      if (
        isNaN(boardArray[n][i]) === false &&
        valid(boardArray, n, i) === true
      ) {
        solveArray.push(true)
      }
    }
  }
  if (solveArray.length === 81 && checker(solveArray) === true) {
    solvedMessage.style.opacity = 1
  } else {
    alert('There are errors in the puzzle')
  }
})

const replay = restart.addEventListener('click', function () {
  location.reload()
  // while (board.firstChild) {
  //   board.removeChild(board.firstChild)
  // }
  // start(startBoard)
})
