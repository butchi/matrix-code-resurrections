'use strict';

const size = 128; // 横幅
const tail = 6; // 尾の長さ
const linage = 38; // 表示する行数

const conElm = document.querySelector('.con');

const word = 'MATRIX_RESURRECTIONS';
const wordY = 18 + size + tail; // wordの縦位置
const wordX = 17; // wordの開始位置
const posIntv = 3; // wordの文字間隔
const posArr = []; // wordの文字の横位置配列

/** 整数ビット逆転 */
const bitRev = (n, bit) => {
    const zeros = (new Array(bit+1)).join('0');
    return parseInt((zeros+n.toString(2)).slice(-zeros.length).split('').reverse().join(''),2);
}

/** ランダムな半角カタカナを返す */
const randomKana = _ => {
    return String.fromCharCode(65393+~~(44*Math.random()))
}

for(let i=0; i<word.length; i++) {
    posArr.push(wordX + posIntv*i);
}

for(let y=0; y<size*2+tail; y++) {
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    if(y<size+tail || y >= size+tail+linage) {
        row.style['display'] = 'none';
    }
    for(let x=0; x<size; x++) {
        const cell = document.createElement('span');
        cell.innerHTML = randomKana();
        row.appendChild(cell);
    }
    conElm.appendChild(row);
}

// "MATRIX_RESURRECTIONS" の埋め込み
for(let i=0; i<posArr.length; i++) {
    const rowElm = [...conElm.querySelectorAll('.row')][wordY];
    const colElm = [...rowElm.querySelectorAll('span')][posArr[i]];
    colElm.innerText = word[i];
}

let cnt = 0;
const rowElmArr = [...conElm.querySelectorAll('.row')];
for (let r = 0, len = rowElmArr.length; r < len; ++r) {
    const rowElm = rowElmArr[r];
    const spanElmArr = [...rowElm.querySelectorAll('span')];
    rowElm.span = [];
    for (let k = 0; k < size; ++k) {
        rowElm.span.push(spanElmArr[k]);
    }
}

const loop = _ => {
    for(let x=0; x<size; x++) {
        for(let d=0; d<tail; d++) {
            const y = bitRev(x, 7)+cnt+d;
            let elm = rowElmArr[y];
            if(!elm) {
                break;
            }
            elm = elm.span[x];
            elm.setAttribute('class', 'val-'+d);
            if(y === wordY && posArr.indexOf(x) > -1) {
                elm.style.color = '#0f0';
            }
        }
    }

    if(cnt < size+linage+tail) {
        setTimeout(function() {
            cnt++;
            loop();
        }, 50);
    }
}
loop();
