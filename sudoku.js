const restart = document.getElementById('replay')
const check = document.getElementById('check')
const gameBoard = document.querySelector('.board')
const congraMessage = document.querySelector('.solve')
const solveButton = document.getElementById('solve-answer')
let on_off = document.querySelector('.game-music')
let audio = document.querySelector('.musicOn audio')

let boardArray = []

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

class Row {
  constructor(name) {
    this.name = name
  }
  createRow() {
    const newRow = document.createElement('tr')
    newRow.classList.add('row')
    newRow.setAttribute('id', `row${this.name}`)
    gameBoard.append(newRow)
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

const valid = (board, n, i) => {
  let rowDuplicate = Duplicates(board[n])
  const column = arrayColumn(board, i)
  let columnDuplicate = Duplicates(column)
  const subgridArray = subgrid(board, n, i)
  let subgridDuplicate = Duplicates(subgridArray)
  if (
    rowDuplicate.includes(board[n][i]) ||
    columnDuplicate.includes(board[n][i]) ||
    subgridDuplicate.includes(board[n][i])
  ) {
    return false
  } else {
    return true
  }
}

const randomlize = (board) => {
  for (let n = 0; n < 9; n++) {
    const rndRange = Math.floor(Math.random() * 2) + 4
    for (let i = 0; i <= rndRange; i++) {
      const rndBox = Math.floor(Math.random() * 8)
      const rndNumber = Math.floor(Math.random() * 9) + 1
      board[n][rndBox] = rndNumber
      let isValid = valid(board, n, rndBox)
      if (isValid === false) {
        board[n][rndBox] = 0
      }
    }
  }
  return board
}

const solveSudoku = () => {
  let board = randomlize(emptyGrid)
  let board1 = JSON.parse(JSON.stringify(board))
  // let count = 3
  // if (count <= 3 && count > 0) {
  //   while (dfs(board) != true) {
  //     board = randomlize(emptyGrid)
  //     board1 = JSON.parse(JSON.stringify(board))
  //     count -= 1
  //   }
  // } else {
  //   solveSudoku()
  // }
  while (dfs(board) != true) {
    board = randomlize(emptyGrid)
    board1 = JSON.parse(JSON.stringify(board))
  }
  return [board, board1]
}

const dfs = (board) => {
  for (let n = 0; n < 9; n++) {
    for (let i = 0; i < 9; i++) {
      if (board[n][i] === 0) {
        for (let l = 1; l < 10; l++) {
          board[n][i] = l
          let isValid = valid(board, n, i)
          if (isValid === true) {
            if (dfs(board)) return true
          }
        }
        board[n][i] = 0
        return false
      }
    }
  }
  return true
}

const solveProve = solveSudoku()
const answerBoard = solveProve[0]
const startBoard = solveProve[1]

const inputInitValues = (board) => {
  for (n = 0; n < 9; n++) {
    const row = document.getElementById(`row${n}`)
    for (i = 0; i < 9; i++) {
      const box = row.children[`${i}`]
      if (board[n][i] !== 0) {
        box.value = board[n][i]
        box.disabled = true
      }
    }
  }
}

const start = (board) => {
  createGrid()
  boardArray = board
  inputInitValues(boardArray)
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
        let isValid = valid(boardArray, n, i)
        if (isNaN(boardArray[n][i]) === false && isValid === false) {
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

const checkInput = check.addEventListener('click', function () {
  const checkArray = []
  for (let n = 0; n < 9; n++) {
    for (let i = 0; i < 9; i++) {
      let isValid = valid(boardArray, n, i)
      if (isNaN(boardArray[n][i]) === false && isValid === true) {
        checkArray.push(true)
      }
    }
  }
  if (checkArray.length === 81 && checker(checkArray) === true) {
    congraMessage.style.opacity = 1
  } else {
    alert('There are errors in the puzzle')
  }
})

const showAnswer = solveButton.addEventListener('click', function () {
  inputInitValues(answerBoard)
})

const replay = restart.addEventListener('click', function () {
  location.reload()
  // while (board.firstChild) {
  //   board.removeChild(board.firstChild)
  // }
  // const solveProve = solveSudoku()
  // const answerBoard = solveProve[0]
  // const startBoard = solveProve[1]
  // start(startBoard)
})

const music = on_off.addEventListener('click', function () {
  audio.paused ? audio.play() : music_stop()
})

const music_stop = () => {
  audio.pause()
  audio.currentTime = 0
}
