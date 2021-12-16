'use strict';

const matrixCode = (word, isVirgin = false) => {
    const size = 128; // 横幅
    const tail = 6; // 尾の長さ
    const linage = 38; // 表示する行数

    const colorLi = {
        0: '#000000',
        1: '#001100',
        2: '#003300',
        3: '#006600',
        4: '#009900',
        5: '#00ff00',
    }

    const conElm = document.querySelector('.con');

    const posIntv = 3; // wordの文字間隔
    const posArr = []; // wordの文字の横位置配列
    const wordY = 18 + size + tail; // wordの縦位置
    const wordX = Math.floor(size / 2 - (word.length * posIntv) / 2); // wordの開始位置

    const kanaStr = 'ﾋﾌﾐﾖｲﾏﾜﾘﾃﾒｸﾙﾑﾅﾔｺﾄｱｳﾉｽﾍｼﾚｶﾀﾁｻｷｿﾗﾆﾓﾛｹｾﾕｪﾇｵｦﾊｴﾂｨﾈﾎﾝ';

    /** 整数ビット逆転 */
    const bitRev = (n, bit) => {
        const zeros = (new Array(bit + 1)).join('0');
        return parseInt((zeros + n.toString(2)).slice(-zeros.length).split('').reverse().join(''), 2);
    }

    for (let i = 0; i < word.length; i++) {
        posArr.push(wordX + posIntv * i);
    }

    conElm.innerHTML = '';
    let idx = 0;
    for (let y = 0; y < size * 2 + tail; y++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        if (y < size + tail || y >= size + tail + linage) {
            row.style['display'] = 'none';
        }
        for (let x = 0; x < size; x++) {
            idx++;
            const cell = document.createElement('span');
            cell.innerText = kanaStr[idx % kanaStr.length];
            row.appendChild(cell);
        }
        conElm.appendChild(row);
    }

    // "MATRIX_RESURRECTIONS" の埋め込み
    for (let i = 0; i < posArr.length; i++) {
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

    if (isVirgin === true) {
        posArr.forEach(x => {
            rowElmArr[wordY].span[x].style['color'] = '#0f0';
        });

        return;
    }

    const timestamp = new Date();

    const loop = _ => {
        const t = new Date();

        const curCnt = Math.floor((t.valueOf() - timestamp.valueOf()) / 52);

        for (cnt; cnt < curCnt; cnt++) {
            for (let x = 0; x < size; x++) {
                for (let d = 0; d < tail; d++) {
                    const y = bitRev(x, 7) + cnt + d;
                    let elm = rowElmArr[y];
                    if (!elm) {
                        break;
                    }
                    elm = elm.span[x];
                    elm.style['color'] = colorLi[d];
                    elm.style['transform'] = 'scaleX(-1)';
                    if (y === wordY && posArr.indexOf(x) > -1) {
                        elm.style['color'] = '#0f0';
                        elm.style['transform'] = 'scaleX(1)';
                        elm.style['text-shadow'] = '0 0 1px #00ff00';
                    }
                }
            }
        }

        if (cnt < size + linage + tail) {
            requestAnimationFrame(loop);
        }
    }
    loop();
}

const startHandler = evt => {
    document.onkeydown = null;

    document.onclick = null;

    document.querySelector('audio').play()

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('MATRIX_RESURRECTIONS');
    }, 0);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('WHO ARE YOU ?');
    }, 16540);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('YOU HAVE RESURRECTED ?');
    }, 16540 * 2);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('BORN AGAIN ?');
    }, 16560 * 3);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('WHERE IS THE WORLD ?');
    }, 16560 * 4);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('WHO CAN I ENCOUNTER ?');
    }, 16560 * 5);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('AM I ?');
    }, 16560 * 6);

    setTimeout(_ => {
        clearTimeout(timer);
        matrixCode('MATRIX_RESURRECTIONS');
    }, 16560 * 7);
}

document.onkeydown = startHandler;

document.onclick = startHandler;

matrixCode('ENTER', true);
