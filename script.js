let hzSquareNumber = 25;
let vSquareNumber = 25;
const root = document.querySelector(':root');
const body = document.querySelector('body');
let grid = document.getElementById('squareHolder');
let mineCountNumber = document.getElementById('mineCountNumber');
let timerNumber = document.getElementById('timer');
let defaultHeight = 90;

let squares = [];
let figureOutMines = [];
let firstClick = true;
var mineMode = false;
let mineCount = 0;
let guessMode = false;
let mouseDownMode = true;
let gameEnded = false;
let time = [0,0,0,0];
let lastTime = 0;
let puzzleMineArr;
let puzzleBlankArr;
let puzzleInfo = {};
let timerInterval;
let winAnimationRunning = false;
let completedPuzzles = localStorage['completedPuzzles'];
let usedGuessNum = 0;
if(!completedPuzzles) {
    localStorage['completedPuzzles'] = JSON.stringify([]);
}


let colors = [
    'transparent',
    'rgb(0, 144, 131)', 
    'rgb(0, 168, 19)', 
    'rgb(243, 104, 0)', 
    'rgb(0, 50, 180)', 
    'rgb(207, 0, 0)', 
    'rgb(201, 197, 0)',
    'rgb(91, 0, 125)',
    'rgb(50, 50, 50)'
];

let featuredPuzzles = [
    {
        'title': 'Puzzle 1',
        'id': '0 1',
        'hzSquareNumber': 4,
        'vSquareNumber': 5,
        'mineArr': [[1,0],[0,1],[0,4],[3,4],[1,3],[2,2],[3,2],[3,0]],
        'revealedArr': [[0,0],[1,1],[0,2],[0,3],[1,4],[2,4],[3,3],[3,1]],
        'flaggedArr': [[1,0],[0,1],[0,4],[3,4]],
        'blankArr': []
    },
    {
        'title': 'Puzzle 2',
        'id': '0 2',
        'hzSquareNumber': 7,
        'vSquareNumber': 4,
        'mineArr': [[2,1],[0,2],[1,3],[4,1],[4,2],[4,3],[5,3],[6,1],[6,3]],
        'revealedArr': [[0,3],[2,3],[3,3],[5,0],[6,0]],
        'flaggedArr': [],
        'blankArr': [[1,1]]
    },
    {
        'title': 'Puzzle 3',
        'id': '0 3',
        'hzSquareNumber': 8,
        'vSquareNumber': 7,
        'mineArr': [[0,1],[0,5],[1,2],[2,0],[2,4],[2,6],[5,1],[5,5],[6,0],[6,3],[6,4],[7,4]],
        'revealedArr': [[1,0],[1,1],[1,3],[1,4],[3,5],[5,0],[5,2],[5,6]],
        'flaggedArr': [[0,5]],
        'blankArr': [[0,6],[1,6],[3,0],[3,1],[3,2],[3,3],[4,0],[4,1],[4,2],[4,3],[6,6],[7,6],[4,4]]
    },
    {
        'title': 'Pattern Maze',
        'id': '0 4',
        'hzSquareNumber': 14,
        'vSquareNumber': 12,
        'mineArr': [[1, 4], [1, 6], [2, 4], [2, 8], [3, 6], [5, 6], [5, 8], [5, 9], [5, 10], [6, 2], [6, 6], [6, 10], [7, 5], [9, 2], [9, 8], [10, 8], [11, 8], [11, 9], [11, 10], [13, 1]], 
        'revealedArr': [[1, 9], [2, 9], [3, 9]],
        'flaggedArr': [],
        'blankArr': [[0, 0], [0, 1], [0, 2], [0, 3], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [1, 0], [1, 1], [1, 2], [1, 3], [1, 10], [1, 11], [2, 0], [2, 1], [2, 2], [2, 3], [2, 10], [2, 11], [3, 0], [3, 1], [3, 2], [3, 3], [3, 10], [3, 11], [4, 0], [4, 1], [4, 2], [4, 3], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [5, 0], [5, 7], [5, 11], [6, 0], [6, 7], [6, 11], [7, 11], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 11], [9, 5], [9, 6], [9, 7], [9, 11], [10, 1], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 11], [11, 1], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [12, 3], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [13, 3], [13, 4], [13, 5], [13, 6], [13, 7], [13, 8], [13, 9], [13, 10], [13, 11]]
    }
]

let customPuzzles = [
    'Plus',

]

let patternPuzzles = [
    {
        'title': 'Random',
        'id': '2 1',
    },
    {
        'title': '1 2 1',
        'id': '2 2',
        'hzSquareNumber': 3,
        'vSquareNumber': 3,
        'mineArr': [[0,0],[2,0]],
        'revealedArr': [[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]],
        'flaggedArr': [],
        'blankArr': []
    },
    {
        'title': '1 2 2 1',
        'id': '2 3',
        'hzSquareNumber': 4,
        'vSquareNumber': 3,
        'mineArr': [[1,0],[2,0]],
        'revealedArr': [[0,1],[1,1],[2,1],[3,1],[0,2],[1,2],[2,2],[3,2]],
        'flaggedArr': [],
        'blankArr': []
    },
    {
        'title': '1 Pyramid',
        'id': '2 4',
        'hzSquareNumber': 6,
        'vSquareNumber': 5,
        'mineArr': [[0,2],[3,2]],
        'revealedArr': [[0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]],
        'flaggedArr': [],
        'blankArr': [[5,2],[5,3],[5,4],[5,5]]
    },
    {
        'title': '2s on a Wall',
        'id': '2 5',
        'hzSquareNumber': 3,
        'vSquareNumber': 4,
        'mineArr': [[0,1],[1,1]],
        'revealedArr': [[0,2],[1,2],[2,2],[0,3],[1,3],[2,3]],
        'flaggedArr': [],
        'blankArr': [[5,2],[5,3],[5,4],[5,5]]
    },
    {
        'title': '1 2',
        'id': '2 6',
        'hzSquareNumber': 6,
        'vSquareNumber': 2,
        'mineArr': [[1,0],[2,0],[4,0]],
        'revealedArr': [[0,1],[1,1],[2,1],[3,1],[4,1]],
        'flaggedArr': [],
        'blankArr': []
    },
    {
        'title': '3',
        'id': 'idk',
        'hzSquareNumber': 5,
        'vSquareNumber': 3,
        'mineArr': [[1,0],[2,0],[3,0]],
        'revealedArr': [[0,1],[1,1],[2,1],[3,1],[4,1],[0,2],[1,2],[2,2],[3,2],[4,2]],
        'flaggedArr': [],
        'blankArr': []
    }
]

let game = (puzzle) => {
    squares = [];
    figureOutMines = [];
    firstClick = true;
    mineMode = false;
    mineCount = 0;
    usedGuessNum = 0;

    let mapBoard = () => {
        if(!puzzle) {
            for(let i = 0; i < hzSquareNumber * vSquareNumber; i++) {
                figureOutMines.push('');
            }

            for(let i = 0; i < figureOutMines.length*(0.206); i++) {
                let added = false;
                while(!added) {
                    let index = Math.floor(Math.random() * figureOutMines.length);
                    if(figureOutMines[index] !== 'mine') {
                        figureOutMines[index] = 'mine';
                        mineCount++;
                        added = true;
                    }
                }
            }
            mineCountNumber.innerHTML = `Mines: ${mineCount}`;

            let totalSquareNumber = 0;
            for(let i = 0; i < hzSquareNumber; i++) {
                squares.push([]);
                for(let j = 0; j < vSquareNumber; j++) {
                    squares[i].push(figureOutMines[totalSquareNumber]);
                    totalSquareNumber++;
                }
            }
        } else {
            setTimeout(() => {
                timerInterval = setInterval(timerFunction, 1000/60);
            })
            hzSquareNumber = puzzleInfo['hzSquareNumber'];
            vSquareNumber = puzzleInfo['vSquareNumber'];
            firstClick = false;
            let mineArr = [...puzzleInfo['mineArr']];
            let blankArr = [...puzzleInfo['blankArr']];
            for(let i = 0; i < hzSquareNumber; i++) {
                squares.push([]);
                for(let j = 0; j < vSquareNumber; j++) {
                    let nest1 = false;
                    let nest2 = false;
                    for(let k = 0; k < mineArr.length; k++) {
                        if(JSON.stringify(mineArr[k]) == JSON.stringify([i,j])) {
                            nest1 = true;
                            break;
                        }
                    }
                    for(let k = 0; k < blankArr.length; k++) {
                        if(JSON.stringify(blankArr[k]) == JSON.stringify([i,j])) {
                            nest2 = true;
                            break;
                        }
                    }
                    if(nest1) {
                        squares[i].push('mine');
                    } else if(nest2) {
                        squares[i].push('blank');
                    } else {
                        squares[i].push('');
                    }
                }
            }
            mineCount = 'none';
            mineCountNumber.innerHTML = puzzleInfo['title'];
        }

        if(vSquareNumber > 20) {
            grid.style.overflowY = 'auto';
        } else {
            grid.style.overflowY = 'visible';
        }

        if(window.innerWidth/window.innerHeight > hzSquareNumber/vSquareNumber || vSquareNumber >= 20) {
            if(((window.innerHeight/10*9)/vSquareNumber) * hzSquareNumber > window.innerWidth/10*9.5) {
                grid.style.overflowX = 'auto';
            } else {
                grid.style.overflowX = 'visible';
            }
            grid.style.height = `${defaultHeight}vh`;
            let width = vSquareNumber;
            if(vSquareNumber > 20) {
                width = 20;
            }
            if((grid.offsetHeight/width) * hzSquareNumber > window.innerWidth/10*9.5) {
                grid.style.width = `${window.innerWidth/10*9.5}px`;
                grid.style.left = `${window.innerWidth/100*2.5}px`;
            } else {
                grid.style.width = `${(grid.offsetHeight/width) * hzSquareNumber}px`;
                grid.style.left = `${(window.innerWidth - ((grid.offsetHeight/width) * hzSquareNumber))/2}px`;
            }
            grid.style.top = `${window.innerHeight/100*7}px`;
        } else {
            grid.style.width = `${window.innerWidth/10*9.5}px`;
            grid.style.left = '2.5vw';
            if(grid.offsetWidth/hzSquareNumber > (window.innerHeight/10*9) / 20) {
                grid.style.height = `${grid.offsetWidth/hzSquareNumber*vSquareNumber}px`;
                grid.style.overflowX = 'visible';
            } else {
                grid.style.height = `${(window.innerHeight/10*9/20*vSquareNumber)}px`;
                grid.style.overflowX = 'auto';
            }
            grid.style.top = `${(window.innerHeight - grid.offsetHeight)/2-4}px`;

        }
        grid.style.gridTemplateColumns = `repeat(${vSquareNumber} 1fr)`;
        grid.style.gridTemplateRows = `repeat(${hzSquareNumber} 1fr)`;

        for(let i = 0; i < hzSquareNumber; i++) {
            for(let j = 0; j < vSquareNumber; j++) {
                if(squares[i][j] == 'mine') {
                    gameMineFunction1(i-1, j-1);
                    gameMineFunction1(i-1, j);
                    gameMineFunction1(i-1, j+1);
                    gameMineFunction1(i, j-1);
                    gameMineFunction1(i, j+1);
                    gameMineFunction1(i+1, j-1);
                    gameMineFunction1(i+1, j);
                    gameMineFunction1(i+1, j+1);
                }
            }
        }

        for(let i = 0; i < squares.length; i++) {
            for(let j = 0; j < squares[i].length; j++) {
                squares[i][j] = {
                    'value': squares[i][j],
                    'revealed': false,
                    'flagged': false
                }
            }
        }

        const fragment = document.createDocumentFragment();
        let heightNumber = vSquareNumber;
        if(vSquareNumber > 20) {
            heightNumber = 20;
        }
        let pFontSize = `${(grid.offsetHeight/heightNumber)/2}px`;
        if(grid.offsetHeight/heightNumber > window.innerHeight/100*18) {
            pFontSize = `${(grid.offsetHeight/6)/2}px`;
        }

        for(let i = 0; i < hzSquareNumber; i++) {
            for(let j = 0; j < vSquareNumber; j++) {
                if(squares[i][j]['value'] != 'blank') {
                    let cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.style.gridRow = (j+1).toString();
                    cell.style.gridColumn = (i+1).toString();
                    cell.style.height = `${grid.offsetHeight/heightNumber}px`;
                    cell.style.width = `${grid.offsetHeight/heightNumber}px`;
                    root.style.setProperty('--borderRadiusForAnimation', `${(grid.offsetWidth/hzSquareNumber)/4}px`);
                    squares[i][j]['cell'] = cell;
                    fragment.appendChild(cell);

                    let cellClicked = false;
                    let cellMouseDown = false;

                    
                    let p = document.createElement('p');
                    p.classList.add('number');
                    cell.appendChild(p);
                    p.style.fontSize = pFontSize;

                    cell.addEventListener('mousedown', () => {
                        mouseUpFunction();
                    })


                    let mouseUpFunction = () => {
                        if(!(!mineMode && squares[i][j]['flagged'])) {
                            if(!squares[i][j]['revealed']) {
                                if(!cellClicked && (cellMouseDown || mouseDownMode)) {
                                    if(!(mineMode && firstClick)) {
                                        if(!mineMode) {
                                            cellClicked = true;
                                        }
                                        revealSquare(i, j);
                                    }
                                }
                            } else if(mouseDownMode && mineMode) {
                                if(squares[i][j]['revealed']) {
                                    if(!(mineMode && firstClick)) {
                                        revealSquare(i, j);
                                    }
                                }
                            } else if(guessMode && mouseDownMode) {
                                if(squares[i][j]['revealed']) {
                                    if(!(mineMode && firstClick)) {
                                        if(!mineMode) {
                                            mineMode = true;
                                            setTimeout(() => {
                                                mineMode = false;
                                            });
                                        }
                                        revealSquare(i, j);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    squares[i][j]['revealed'] = true;
                }
            }
        }
        grid.appendChild(fragment);
    }
    if(puzzle) {
        setTimeout(() => {
            let revealedArr = puzzleInfo['revealedArr'];
            let flaggedArr = puzzleInfo['flaggedArr'];
            for(let i = 0; i < hzSquareNumber; i++) {
                for(let j = 0; j < vSquareNumber; j++) {
                    for(let k = 0; k < revealedArr.length; k++) {
                        if(JSON.stringify(revealedArr[k]) == JSON.stringify([i,j])) {
                            revealSquare(i,j,true);
                            break;
                        }
                        if(JSON.stringify(flaggedArr[k]) == JSON.stringify([i,j])) {
                            const ifMineMode = mineMode;
                            mineMode = true;
                            revealSquare(i,j);
                            mineMode = ifMineMode;
                            break;
                        }
                    }
                }
            }
        });
    }

    mapBoard();
}

document.addEventListener('keydown', (event) => {
    if(['Meta', 'Control'].indexOf(event.key) != -1) {
        mineMode = true;
    }
    if(['r'].indexOf(event.key) != -1) {
        restart();
    }
    if(['5','%'].indexOf(event.key) != -1) {
        guessMode = true;
    }
    if(['-'].indexOf(event.key) != -1) {
        won();
    }
    if(['='].indexOf(event.key) != -1) {
        completeBoard();
    }
});

document.addEventListener('keyup', (event) => {
    if(['Meta', 'Control'].indexOf(event.key) != -1) {
        mineMode = false;
    }
    if(['5','%'].indexOf(event.key) != -1) {
        guessMode = false;
    }
});

let revealSquare = (h, v, prompted) => {
    if(h >= 0 && h < hzSquareNumber && v >= 0 && v < vSquareNumber) {
        if(squares[h][v]['value'] != 'blank') {
            if(prompted != true) {
                prompted = false;
            }
            if(mineMode && !prompted) {
                if(!squares[h][v]['revealed']) {
                    if(!squares[h][v]['flagged']) {
                        setTimeout(() => {
                            squares[h][v]['cell'].style.backgroundColor = 'rgb(184, 71, 62)';
                            squares[h][v]['cell'].style.border = '0px';
                            squares[h][v]['flagged'] = true;
                            if(mineCount != 'none') {
                                mineCount--;
                                mineCountNumber.innerHTML = `Mines: ${mineCount}`;
                            }
                        });
                    } else {
                        setTimeout(() => {
                            squares[h][v]['cell'].style.backgroundColor = 'rgb(69, 75, 82)';
                            squares[h][v]['cell'].style.border = '2px solid black';
                            squares[h][v]['flagged'] = false;
                            if(mineCount != 'none') {
                                mineCount++;
                                mineCountNumber.innerHTML = `Mines: ${mineCount}`;
                            }
                        });
                    }
                } else {
                    if(!squares[h][v]['flagged']) {
                        let mines = 0;
                        let marked = 0;

                        mines += checkForAddedMine2(h-1, v-1);
                        marked += completeSquareMarked(h-1, v-1);

                        mines += checkForAddedMine2(h-1, v);
                        marked += completeSquareMarked(h-1, v);

                        mines += checkForAddedMine2(h-1, v+1);
                        marked += completeSquareMarked(h-1, v+1);

                        mines += checkForAddedMine2(h, v-1);
                        marked += completeSquareMarked(h, v-1);

                        mines += checkForAddedMine2(h, v+1);
                        marked += completeSquareMarked(h, v+1);

                        mines += checkForAddedMine2(h+1, v-1);
                        marked += completeSquareMarked(h+1, v-1);

                        mines += checkForAddedMine2(h+1, v);
                        marked += completeSquareMarked(h+1, v);

                        mines += checkForAddedMine2(h+1, v+1);
                        marked += completeSquareMarked(h+1, v+1);

                        if(mines == marked && marked == squares[h][v]['value']) {
                            let lostVar = false;
                            if(checkForAddedMine2(h-1, v-1) == 1 && completeSquareMarked(h-1, v-1) == 0) {
                                squares[h-1][v-1]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h-1, v) == 1 && completeSquareMarked(h-1, v) == 0) {
                                squares[h-1][v]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h-1, v+1) == 1 && completeSquareMarked(h-1, v+1) == 0) {
                                squares[h-1][v+1]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h, v-1) == 1 && completeSquareMarked(h, v-1) == 0) {
                                squares[h][v-1]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h, v+1) == 1 && completeSquareMarked(h, v+1) == 0) {
                                squares[h][v+1]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h+1, v-1) == 1 && completeSquareMarked(h+1, v-1) == 0) {
                                squares[h+1][v-1]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h+1, v) == 1 && completeSquareMarked(h+1, v) == 0) {
                                squares[h+1][v]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(checkForAddedMine2(h+1, v+1) == 1 && completeSquareMarked(h+1, v+1) == 0) {
                                squares[h+1][v+1]['cell'].style.backgroundColor = 'black';
                                lostVar = true;
                            }
                            if(lostVar) {
                                lost();
                            } else {
                                revealSquare(h-1, v-1, true);
                                revealSquare(h-1, v, true);
                                revealSquare(h-1, v+1, true);
                                revealSquare(h, v-1, true);
                                revealSquare(h, v+1, true);
                                revealSquare(h+1, v-1, true);
                                revealSquare(h+1, v, true);
                                revealSquare(h+1, v+1, true);
                            }
                        }
                    }
                }
            } else if(guessMode && !prompted) {
                usedGuessNum++;
                if(!squares[h][v]['revealed']) {
                    if(squares[h][v]['value'] == 'mine') {
                        setTimeout(() => {
                            squares[h][v]['cell'].style.backgroundColor = 'rgb(184, 71, 62)';
                            squares[h][v]['cell'].style.border = '0px';
                            squares[h][v]['flagged'] = true;
                            if(mineCount != 'none') {
                                mineCount--;
                                mineCountNumber.innerHTML = `Mines: ${mineCount}`;
                            }
                        });
                    } else {
                        revealSquare(h, v, true);
                    }
                }
            } else if(!squares[h][v]['revealed']){
                if(firstClick) {
                    firstClick = false;
                    timerInterval = setInterval(timerFunction, 1000/60);
                    if(squares[h][v]['value'] != 0) {
                        let mineFixNumber = 0;
                        if(squares[h][v]['value'] == 'mine') {
                            mineFixNumber++;
                        }
                        squares[h][v]['value'] = 0;
                        mineFixNumber += addedMineFix(h-1, v-1);
                        mineFixNumber += addedMineFix(h-1, v);
                        mineFixNumber += addedMineFix(h-1, v+1);
                        mineFixNumber += addedMineFix(h, v-1);
                        mineFixNumber += addedMineFix(h, v+1);
                        mineFixNumber += addedMineFix(h+1, v-1);
                        mineFixNumber += addedMineFix(h+1, v);
                        mineFixNumber += addedMineFix(h+1, v+1);

                        for(let i = 0; i < mineFixNumber; i++) {
                            let added = false;
                            while(!added) {
                                let index = Math.floor(Math.random() * hzSquareNumber * vSquareNumber);
                                let vIndex = Math.floor(index/hzSquareNumber);
                                let hIndex = index % hzSquareNumber;
                                if(squares[hIndex][vIndex]['value'] !== 'mine' && (Math.abs(hIndex-h) > 1 || Math.abs(vIndex-v) > 1)) {
                                    squares[hIndex][vIndex]['value'] = 'mine';
                                    added = true;
                                    gameMineFunction2(hIndex-1, vIndex-1);
                                    gameMineFunction2(hIndex-1, vIndex);
                                    gameMineFunction2(hIndex-1, vIndex+1);
                                    gameMineFunction2(hIndex, vIndex-1);
                                    gameMineFunction2(hIndex, vIndex+1);
                                    gameMineFunction2(hIndex+1, vIndex-1);
                                    gameMineFunction2(hIndex+1, vIndex);
                                    gameMineFunction2(hIndex+1, vIndex+1);
                                }
                            }
                        }
                    }

                }

                if(h >= 0 && h < hzSquareNumber && v >= 0 && v < vSquareNumber && !squares[h][v]['revealed']) {
                    if(!prompted || (prompted && squares[h][v]['value'] != 'mine')) {
                        squares[h][v]['cell'].style.backgroundColor = 'rgb(80, 90, 99)';
                        squares[h][v]['revealed'] = true;
                        let cell = squares[h][v]['cell'];
                        let p = cell.querySelector('p');
                        if(squares[h][v]['value'] != 'mine' && squares[h][v]['value'] != 0) {
                            p.innerHTML = squares[h][v]['value'];
                        }
                        cell.style.border = '2px solid gray';
                        p.style.color = colors[squares[h][v]['value']];
                        if(squares[h][v]['value'] == 'mine') {
                            if(!prompted) {
                                setTimeout(() => {
                                    cell.style.backgroundColor = 'black';
                                    cell.style.border = '0px';
                                    lost();
                                });
                            }
                        } else if(squares[h][v]['value'] == 0) {
                            revealSquare(h-1, v-1, true);
                            revealSquare(h-1, v, true);
                            revealSquare(h-1, v+1, true);
                            revealSquare(h, v-1, true);
                            revealSquare(h, v+1, true);
                            revealSquare(h+1, v-1, true);
                            revealSquare(h+1, v, true);
                            revealSquare(h+1, v+1, true);
                        }
                    }
                }
            }
        }
    }
    checkForWin();
}

let checkForAddedMine = (h, v) => {
    if(h >= 0 && h < hzSquareNumber && v >= 0 && v < vSquareNumber) {
        if(squares[h][v] == 'mine') {
            return 1;
        }
    }
    return 0;
}

let checkForAddedMine2 = (h, v) => {
    if(h >= 0 && h < hzSquareNumber && v >= 0 && v < vSquareNumber) {
        if(squares[h][v]['value'] == 'mine') {
            return 1;
        }
    }
    return 0;
}

let checkForAddedMinePuzzle = (h, v, arr) => {
    if(h >= 0 && h < arr.length && v >= 0 && v < arr.length) {
        if(arr[h][v] == 'mine') {
            return 1;
        }
    }
    return 0;
}

let addedMineFix = (h, v) => {
    if(h >= 0 && h < hzSquareNumber && v >= 0 && v < vSquareNumber) {
        const adjuster = checkForAddedMine2(h, v);
        if(adjuster == 1) {
            gameMineFunctionReverse(h-1, v-1);
            gameMineFunctionReverse(h-1, v);
            gameMineFunctionReverse(h-1, v+1);
            gameMineFunctionReverse(h, v-1);
            gameMineFunctionReverse(h, v+1);
            gameMineFunctionReverse(h+1, v-1);
            gameMineFunctionReverse(h+1, v);
            gameMineFunctionReverse(h+1, v+1);
        }
        let value = 0;
        value += checkForAddedMine2(h-1, v-1);
        value += checkForAddedMine2(h-1, v);
        value += checkForAddedMine2(h-1, v+1);
        value += checkForAddedMine2(h, v-1);
        value += checkForAddedMine2(h, v+1);
        value += checkForAddedMine2(h+1, v-1);
        value += checkForAddedMine2(h+1, v);
        value += checkForAddedMine2(h+1, v+1);
        squares[h][v]['value'] = value;
        return adjuster;
    }
    return 0;
}

let completeSquareMarked = (h, v) => {
    if(h >= 0 && h < hzSquareNumber && v >= 0 && v < vSquareNumber) {
        if(squares[h][v]['flagged']) {
            return 1;
        }
    }
    return 0;
}

let checkForWin = () => {
    for(let i = 0; i < hzSquareNumber; i++) {
        for(let j = 0; j < vSquareNumber; j++) {
            if(!squares[i][j]['revealed'] && squares[i][j]['value'] != 'mine') {
                return;
            }
        }
    }
    if(!gameEnded) {
        won();
    }
}

let puzzleMineFunction = (h, v, arr) => {
    if(h >= 0 && h < arr.length && v >= 0 && v < arr[0].length) {
        if(arr[h][v] != 'mine' && arr[h][v] != 'blank') {
            arr[h][v]++;
        }
    }
}

let gameMineFunction1 = (h, v) => {
    if(h >= 0 && h < squares.length && v >= 0 && v < squares[0].length) {
        if(squares[h][v] != 'mine' && squares[h][v] != 'blank') {
            squares[h][v]++;
        }
    }
}

let gameMineFunctionReverse = (h, v) => {
    if(h >= 0 && h < squares.length && v >= 0 && v < squares[0].length) {
        if(squares[h][v]['value'] != 'mine' && squares[h][v]['value'] != 'blank' && squares[h][v]['value'] > 0) {
            squares[h][v]['value']--;
        }
    }
}

let gameMineFunction2 = (h, v) => {
    if(h >= 0 && h < squares.length && v >= 0 && v < squares[0].length) {
        if(squares[h][v]['value'] != 'mine' && squares[h][v]['value'] != 'blank') {
            squares[h][v]['value']++;
        }
    }
}

let won = () => {
    winAnimationRunning = true;
    gameEnded = true;
    clearInterval(timerInterval);
    time = [0,0,0,0];
    let iteration = 0;
    let animationOptions = ['Grow', 'Rotate'];
    let index = Math.floor(Math.random()*animationOptions.length);
    let animation = animationOptions[index];
    let intervalId;

    // Define the interval function
    const intervalFunction = () => {
        // Access the diagonal elements
        for (let i = 0; i <= iteration; i++) {
            const j = iteration - i;
            try {
                if (i < hzSquareNumber && j < vSquareNumber && squares[i][j]['value'] !== 'mine') {
                    squares[i][j]['cell'].classList.add(`squares${animation}Animation`);
                } else if(i < hzSquareNumber && j < vSquareNumber) {
                    squares[i][j]['cell'].classList.add(`mines${animation}Animation`);
                    squares[i][j]['cell'].style.zIndex = '2';
                    if(!squares[i][j]['flagged']) {
                        squares[i][j]['flagged'] = true;
                        if(mineCount != 'none') {
                            mineCount--;
                            mineCountNumber.innerHTML = `Mines: ${mineCount}`;
                        }
                    }
                }
            } catch {}
        }
        
        // Increment the iteration
        iteration++;
        
        // Check if we've reached the end of the diagonal
        if (iteration >= hzSquareNumber + vSquareNumber - 1) {
            clearInterval(intervalId);
            setTimeout(() => {
                winAnimationRunning = false;
            },1400);
        }
    };
    
    // Start the interval
    intervalId = setInterval(intervalFunction, 800/(hzSquareNumber+vSquareNumber) + 20);


}

let lost = () => {
    gameEnded = true;
    clearInterval(timerInterval);
    time = [0,0,0,0];
    for(let i = 0; i < hzSquareNumber; i++) {
        for(let j = 0; j < vSquareNumber; j++) {
            if(!squares[i][j]['flagged'] && squares[i][j]['value'] == 'mine') {
                squares[i][j]['cell'].style.backgroundColor = 'black';
                squares[i][j]['cell'].style.border = '0px';
            } else if(squares[i][j]['flagged'] && squares[i][j]['value'] != 'mine') {
                squares[i][j]['cell'].style.backgroundColor = 'rgb(99, 25, 25)';
                squares[i][j]['cell'].style.border = '0px';
            }
        }
    }
}

let restart = () => {
    if(!winAnimationRunning) {
        grid.innerHTML = '';
        clearInterval(timerInterval);
        time = [0,0,0,0];
        timerNumber.innerHTML = '00:00:00';
        gameEnded = false;
        game();
    }
}

window.onload = () => {
    game();
};

let timerFunction = () => {
    let currentTime = Date.now();
    if(Math.abs(currentTime - lastTime) < 500) {
        let deltaTime = currentTime - lastTime;
        time[3] += deltaTime;
        if(time[3] >= 1000) {
            time[2]++;
            time[3] -= 1000;
        }
        if(time[2] >= 60) {
            time[1]++;
            time[2] -= 60;
        }
        if(time[1] >= 60) {
            time[0]++;
            time[1] -= 60;
        }
        if(time[0] == 0) {
            timerNumber.innerHTML = `${formatTime(time[1])}:${formatTime(time[2])}:${formatTime(time[3])}`;
        } else {
            timerNumber.innerHTML = `${formatTime(time[0])}:${formatTime(time[1])}:${formatTime(time[2])}:${formatTime(time[3])}`;
        }
    }
    lastTime = currentTime;
}

let formatTime = (number) => {
    if(number.toString().length == 3) {
        number = (number/10).toFixed(0);
        if(number.toString().length == 3) {
            number = 99;
        }
    }
    if(number.toString().length == 1) {
        return `0${number}`;
    } else {
        return number;
    }
}

let completeBoard = () => {
    firstClick = false;
    for(let i = 0; i < hzSquareNumber; i++) {
        for(let j = 0; j < vSquareNumber; j++) {
            if(squares[i][j]['value'] == 'mine') {
                squares[i][j]['cell'].style.backgroundColor = 'rgb(184, 71, 62)';
                squares[i][j]['cell'].style.border = '0px';
                squares[i][j]['flagged'] = true;
                if(mineCount != 'none') {
                    mineCount--;
                    mineCountNumber.innerHTML = `Mines: ${mineCount}`;
                }
            } else {
                revealSquare(i, j, true);
            }
        }
    }
}

let customPuzzle = (title, x, y, mineArr, revealedArr, flaggedArr, blankArr) => {
    grid.innerHTML = ''; //Gotten from the restart() function
    clearInterval(timerInterval);
    time = [0,0,0,0];
    timerNumber.innerHTML = '00:00:00';
    gameEnded = false;
    if(!mineArr) {
        mineArr = [];
    }
    if(!revealedArr) {
        revealedArr = [];
    }
    if(!flaggedArr) {
        flaggedArr = [];
    }
    if(!blankArr) {
        blankArr = [];
    }

    puzzleInfo = {
        'title': title,
        'hzSquareNumber': x,
        'vSquareNumber': y,
        'mineArr': [...mineArr],
        'revealedArr': [...revealedArr],
        'flaggedArr': [...flaggedArr],
        'blankArr': [...blankArr]
    }
    game(true);
}

let bringUpPuzzlesMenu = () => {
    if(document.querySelectorAll('.puzzlesMenu').length != 0) {
        let testDiv = document.querySelector('.puzzlesMenu');
        if(testDiv.classList.contains('grow') || testDiv.classList.contains('shrink')) {
            return;
        } else {
            testDiv.classList.add('shrink');
            setTimeout(() => {
                testDiv.remove();
            },300);
        }
    } else {
        let div = document.createElement('div');
        div.classList.add('puzzlesMenu');
        div.classList.add('grow');
        body.appendChild(div);

        let featuredTitle = document.createElement('h2');
        featuredTitle.classList.add('puzzleHeader');
        featuredTitle.innerHTML = 'Featured Puzzles'
        div.appendChild(featuredTitle);

        let featuredHolder = document.createElement('div');
        featuredHolder.classList.add('puzzleHolder');
        div.appendChild(featuredHolder);

        let customTitle = document.createElement('h2');
        customTitle.classList.add('puzzleHeader');
        customTitle.style.marginTop = '2%';
        customTitle.innerHTML = 'Custom Puzzles'
        div.appendChild(customTitle);

        let customHolder = document.createElement('div');
        customHolder.classList.add('puzzleHolder');
        div.appendChild(customHolder);

        let xButton = document.createElement('button');
        xButton.innerHTML = '&times;';
        xButton.classList.add('xButtons');
        div.appendChild(xButton);


        let patternTitle = document.createElement('h2');
        patternTitle.classList.add('puzzleHeader');
        patternTitle.style.marginTop = '2%';
        patternTitle.innerHTML = 'Patterns'
        div.appendChild(patternTitle);

        let patternHolder = document.createElement('div');
        patternHolder.classList.add('puzzleHolder');
        div.appendChild(patternHolder);
        patternHolder.style.marginBottom = '2%';

        setTimeout(() => {
            createSmallPuzzle(customPuzzles, customHolder, div);
            createSmallPuzzle(featuredPuzzles, featuredHolder, div);
            createSmallPuzzle(patternPuzzles, patternHolder, div);
        },10);

        xButton.addEventListener('click', () => {
            div.classList.add('shrink');
            setTimeout(() => {
                div.remove();
            },300);
        });
    }
}

let createSmallPuzzle = (arr, holder, div) => {
    for(let i = 0; i < arr.length; i++) {
        let puzzle = document.createElement('div');
        puzzle.classList.add('puzzleDisplayBox');
        if(i == 0) {
            puzzle.style.marginLeft = '0.5%';
        }
        holder.appendChild(puzzle);

        if(arr[i] != 'Plus') {
            let title = document.createElement('p');
            title.classList.add('puzzleTitle');
            title.innerHTML = arr[i]['title'];
            puzzle.appendChild(title);
        } else {
            let shader = document.createElement('div');
            shader.classList.add('puzzlePlusShader');
            puzzle.appendChild(shader);

            let plusSign = document.createElement('i');
            plusSign.classList.add('fas', 'fa-plus', 'puzzlePlusSign');
            shader.appendChild(plusSign);
        }

        puzzle.addEventListener('click', () => {
            div.remove();
            if(arr[i] != 'Plus') {
                customPuzzle(arr[i]['title'], arr[i]['hzSquareNumber'], arr[i]['vSquareNumber'], arr[i]['mineArr'], arr[i]['revealedArr'], arr[i]['flaggedArr'], arr[i]['blankArr']);
            } else {
                createCustomPuzzle();
            }
        });

        let boardBox = document.createElement('div');
        boardBox.classList.add('puzzlePreviewDesign');
        puzzle.appendChild(boardBox);
        
        let thisSquares = [];
        let sizeInterval = [6,10];
        let size = Math.floor(Math.random() * (sizeInterval[1] - sizeInterval[0] + 1) + sizeInterval[0]);
        
        boardBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        boardBox.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        
        // Create a document fragment
        const fragment = document.createDocumentFragment();
        
        for(let h = 0; h < size; h++) {
            thisSquares.push([]);
            for(let v = 0; v < size; v++) {
                if(Math.floor(Math.random() * 5) == 0) {
                    thisSquares[h].push('mine');
                } else {
                    thisSquares[h].push(0);
                }
            }
        }

        for(let h = 0; h < size; h++) {
            for(let v = 0; v < size; v++) {
                if(thisSquares[h][v] == 'mine') {
                    puzzleMineFunction(h-1, v-1, thisSquares);
                    puzzleMineFunction(h-1, v, thisSquares);
                    puzzleMineFunction(h-1, v+1, thisSquares);
                    puzzleMineFunction(h, v-1, thisSquares);
                    puzzleMineFunction(h, v+1, thisSquares);
                    puzzleMineFunction(h+1, v-1, thisSquares);
                    puzzleMineFunction(h+1, v, thisSquares);
                    puzzleMineFunction(h+1, v+1, thisSquares);
                }
            }
        }
        
        for(let h = 0; h < size; h++) {
            for(let v = 0; v < size; v++) {
                let cell = document.createElement('div');
                cell.classList.add('puzzlePreviewCell');
                cell.style.height = boardBox.offsetWidth / size;
                cell.style.width = boardBox.offsetWidth / size;
                cell.style.gridRow = (v+1).toString();
                cell.style.gridColumn = (h+1).toString();
        
                if(thisSquares[h][v] == 'mine') {
                    cell.style.backgroundColor = 'rgb(184, 71, 62)';
                } else {
                    let p = document.createElement('p');
                    p.innerHTML = thisSquares[h][v];
                    p.style.color = colors[thisSquares[h][v]];
                    cell.appendChild(p);
                }
        
                // Append the cell to the fragment
                fragment.appendChild(cell);
            }
        }
        
        // Append the fragment to the boardBox element
        boardBox.appendChild(fragment);
    }
}

let createCustomPuzzle = () => {
    grid.innerHTML = ''; //Copied from restart() function
    clearInterval(timerInterval);
    time = [0,0,0,0];
    timerNumber.innerHTML = '00:00:00';
    gameEnded = false;


}