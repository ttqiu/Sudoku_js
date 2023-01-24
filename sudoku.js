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

const start = () => {
  let boardArry = new Array(81).fill('')
}
