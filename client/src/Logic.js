import { parse } from 'ipaddr.js';
import API from './API';

/** 
*@function DivideRow - return true if the index is divisible by itself
*/

function DivideRow(index, difficult) {

    switch (difficult) {
        case 1:
            if (index != 0 && (index) % 6 == 0) {
                return true;
            }
            break;
        case 2:
            if (index != 0 && (index) % 12 == 0) {
                return true;
            }
            break;
        case 3:
            if (index != 0 && (index) % 18 == 0) {
                return true;
            }
            break;
        case 4:
            if (index != 0 && (index) % 24 == 0) {
                return true;
            }
            break;
        case 5:
            if (index != 0 && (index) % 30 == 0) {
                return true;
            }
            break;
        default:
            return false;
    }
}




function Col(difficult) {
    switch (difficult) {
        case 1:
            return 6;
            break;
        case 2:
            return 12;
            break;
        case 3:
            return 18;
            break;
        case 4:
            return 24;
            break;
        case 5:
            return 30;
            break;
        default:
            return 0;
    }

}

function Row(difficult) {
    switch (difficult) {
        case 1:
            return 4;
            break;
        case 2:
            return 8;
            break;
        case 3:
            return 12;
            break;
        case 4:
            return 16;
            break;
        case 5:
            return 20;
            break;
        default:
            return 0;
    }

}

function rightAndLeft(letter, indexUno, indexDue, col) {
    let i = 1;
    let j = col;

    while (Number.parseInt(j) <= letter.length) {
        if (((Number.parseInt(indexUno) >= Number.parseInt(i)) && (Number.parseInt(indexDue) <= Number.parseInt(j)) && (Number.parseInt(indexDue) > Number.parseInt(indexUno)))
            || ((Number.parseInt(indexUno) <= Number.parseInt(j)) && (Number.parseInt(indexDue) >= Number.parseInt(i)) && (Number.parseInt(indexDue) < Number.parseInt(j) && (Number.parseInt(indexUno) > Number.parseInt(indexDue))))) {
            return 'RoL';
        }
        i = i + col;
        j = j + col;


    }

    return false;

}

function upAndDown(letter, indexUno, indexDue, col, row) {
    let i = 1;
    let j = (letter.length - col) + 1;

    while (Number.parseInt(i) <= (letter.length - col) + 1) {
        for (let z = 0; z < col * (row - 1); z = z + col) {
            if (((Number.parseInt(indexUno) == Number.parseInt(i)) && (Number.parseInt(indexDue) == (Number.parseInt(j) - Number.parseInt(z))))
                || ((Number.parseInt(indexDue) == Number.parseInt(i)) && (Number.parseInt(indexUno) == (Number.parseInt(j) - Number.parseInt(z))))) {
                return 'UoD';

            }

        }
        i = i + 1;
        j = j + 1;

    }
    //console.log();
    return false;

}


//SOPRA VERSO SOTTO DESTRA
function lowRightDiagonal(letter, indexUno, indexDue, col) {
    let i = Number.parseInt(indexUno);
    let j = i + col + 1;

    console.log(j);
    for (j; j <= letter.length; j = j + col + 1) {
        if (Number.parseInt(indexDue) == Number.parseInt(j)) {
            return 'lr';
        }
        if (j % col == 0) {
            j = letter.length + 1;
        }

    }


    return false;
}

//SOTTO VERSO SOPRA SINISTRA
function highLeftDiagonal(letter, indexUno, indexDue, col) {
    let i = Number.parseInt(indexUno);
    let j = i - col - 1;
    let limit= [];
    for (let z = i; z<= letter.length-(col - 1); z = z+ col){
        limit.push(Number.parseInt(z));
        
    }


    for (j; j >= 0; j = j - col - 1) {
        if (Number.parseInt(indexDue) == Number.parseInt(j)) {
            return 'hl';
        }
        if (limit.includes(j)) {
            j = -1;
        }

    }


    return false;

}

function highRightDiagonal(letter, indexUno, indexDue, col) {
    let i = Number.parseInt(indexUno);
    let j = i - col + 1;

    console.log(j);
    for (j; j >= 0; j = j - col + 1) {
        if (Number.parseInt(indexDue) == Number.parseInt(j)) {
            return 'hr';
        }
        if (j % col == 0) {
            j = -1;
        }

    }


    return false;

}

function lowLeftDiagonal(letter, indexUno, indexDue, col) {
    let i = Number.parseInt(indexUno);
    let j = i + col - 1;
    let limit= [];
    for (let z = i; z<= letter.length-(col - 1); z = z+ col){
        limit.push(Number.parseInt(z));
        
    }

    for (j; j <= letter.length; j = j + col - 1) {
        if (Number.parseInt(indexDue) == Number.parseInt(j)) {
            return 'll';
        }
        if (limit.includes(j)) {
            j = letter.length + 1;
        }

    }


    return false;

}


function CorrectLine(letter, indexUno, indexDue, difficult) {
    let col = Col(difficult);
    let row = Row(difficult);

    let resultOne = rightAndLeft(letter, indexUno, indexDue, col);
    console.log('Destro o Sinistro' + resultOne);

    if (!resultOne) {
        resultOne = upAndDown(letter, indexUno, indexDue, col, row);
        console.log('Up o Down:' + resultOne);

        if (!resultOne) {
            resultOne = lowRightDiagonal(letter, indexUno, indexDue, col)
            console.log('LowRight :' + '.....' + resultOne);

            if (!resultOne) {
                resultOne = highLeftDiagonal(letter, indexUno, indexDue, col);
                console.log('HIGHLeft :' + '.....' + resultOne);

                if (!resultOne) {
                    resultOne = highRightDiagonal(letter, indexUno, indexDue, col);
                    console.log('HIGHRIGHT :' + '.....' + resultOne);
                    if (!resultOne) {
                        resultOne = lowLeftDiagonal(letter, indexUno, indexDue, col);
                        console.log('LowLeft :' + '.....' + resultOne);

                    }

                }
            }
        }
    }



    return resultOne;

}


function ClrBtn(direction, letter, indexUno, indexDue, difficult) {
    let index = [];
    let word = [];
    let col = Col(difficult);


    let i = Number.parseInt(indexUno);
    let j = Number.parseInt(indexDue);




    switch (direction) {

        case 'RoL':
            if (i > j) {
                while (Number.parseInt(indexDue) <= Number.parseInt(indexUno)) {
                    index.push(i);
                    word.push(letter[i - 1])
                    i--;
                    indexDue = Number.parseInt(indexDue) + 1;
                }
                word = word.join();
                word = word.replace(/,/g, '');
            } else {
                while (Number.parseInt(indexUno) <= Number.parseInt(indexDue)) {
                    index.push(i);
                    word.push(letter[i - 1])
                    i++;
                    indexUno = Number.parseInt(indexUno) + 1;
                }
                word = word.join();
                word = word.replace(/,/g, '');

            }
            return [word, index];
            break;


        case 'UoD':
            if (i > j) { // sotto verso sopra
                while (Number.parseInt(indexUno) >= Number.parseInt(indexDue)) {
                    index.push(Number.parseInt(indexUno));
                    word.push(letter[Number.parseInt(indexUno) - 1])
                    indexUno = Number.parseInt(indexUno) - col;

                }
                word = word.join();
                word = word.replace(/,/g, '');
            } else {
                while (Number.parseInt(indexUno) <= Number.parseInt(indexDue)) {
                    index.push(Number.parseInt(indexUno));
                    word.push(letter[Number.parseInt(indexUno) - 1])
                    indexUno = Number.parseInt(indexUno) + col;

                }
                word = word.join();
                word = word.replace(/,/g, '');

            }

            return [word, index];
            break;

        case 'lr':
            while (Number.parseInt(indexUno) <= Number.parseInt(indexDue)) {
                index.push(Number.parseInt(indexUno));
                word.push(letter[Number.parseInt(indexUno) - 1])
                indexUno = Number.parseInt(indexUno) + col + 1;

            }
            word = word.join();
            word = word.replace(/,/g, '');
            return [word, index];
            break;

        case 'hl':
            while (Number.parseInt(indexUno) >= Number.parseInt(indexDue)) {
                index.push(Number.parseInt(indexUno));
                word.push(letter[Number.parseInt(indexUno) - 1])
                indexUno = Number.parseInt(indexUno) - col - 1;

            }
            word = word.join();
            word = word.replace(/,/g, '');
            return [word, index];
            break;

        case 'hr':
            while (Number.parseInt(indexUno) >= Number.parseInt(indexDue)) {
                index.push(Number.parseInt(indexUno));
                word.push(letter[Number.parseInt(indexUno) - 1]);
                indexUno = Number.parseInt(indexUno) - col + 1;

            }
            word = word.join();
            word = word.replace(/,/g, '');
            return [word, index];
            break;

        case 'll':
            while (Number.parseInt(indexUno) <= Number.parseInt(indexDue)) {
                index.push(Number.parseInt(indexUno));
                word.push(letter[Number.parseInt(indexUno) - 1]);
                indexUno = Number.parseInt(indexUno) + col - 1;
            }
            word = word.join();
            word = word.replace(/,/g, '');
            return [word, index];
            break;
        default:
            return false;
    }
}

function randomAtoZ(arr) {
    let random = Math.random() * 100000;
    for (let i = 0, length = arr.length; i < length; i++) {
        if (random < arr[i].frequenza) {
            return arr[i].lettera;
        }
    }
}



export { DivideRow, CorrectLine, ClrBtn, randomAtoZ };