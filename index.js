'use strict';

var size = 128; // 横幅
var tail = 6; // 尾の長さ
var linage = 38; // 表示する行数

var $con = $('.con');
var conElm = $con.get(0);

var word = 'MATRIX_RESURRECTIONS';
var wordY = 18 + size + tail; // wordの縦位置
var wordX = 17; // wordの開始位置
var posIntv = 3; // wordの文字間隔
var posArr = []; // wordの文字の横位置配列

var i;
for(i=0; i<word.length; i++) {
    posArr.push(wordX + posIntv*i);
}

var y;
for(y=0; y<size*2+tail; y++) {
    var row = document.createElement('div');
    row.setAttribute('class', 'row');
    if(y<size+tail || y >= size+tail+linage) {
        row.style['display'] = 'none';
    }
    var x;
    for(x=0; x<size; x++) {
        var cell = document.createElement('span');
        cell.innerHTML = randomKana();
        row.appendChild(cell);
    }
    conElm.appendChild(row);
}

var i = 0;
for(i=0; i<posArr.length; i++) {
    $con.find('.row').eq(wordY).find('span').eq(posArr[i]).text(word[i]);
}

var cnt = 0;
var $rows = $con.find('.row');
for (var r = 0, len = $rows.length; r < len; ++r) {
    var $row = $rows.eq(r);
    var $spans = $row.children();
    var elem = $row.get(0);
    elem.span = [];
    for (var k = 0; k < size; ++k) {
        elem.span.push($spans.eq(k));
    }
}

function loop() {
    setTimeout(function() {
        var x;
        for(x=0; x<size; x++) {
            var d;
            for(d=0; d<tail; d++) {
                var y = bitRev(x, 7)+cnt+d;
                var $elm = $rows[y];
                if(!$elm) {
                    break;
                }
                $elm = $elm.span[x];
                $elm.attr('class', 'val-'+d);
                if(y === wordY && posArr.indexOf(x) > -1) {
                    $elm.css('color', '#0f0');
                }
            }
        }

        if(cnt < size+linage+tail) {
            setTimeout(function() {
                cnt++;
                loop();
            }, 50);
        }
    }, 10);
}
loop();

/** 整数ビット逆転 */
function bitRev(n, bit) {
    var zeros = (new Array(bit+1)).join('0');
    return parseInt((zeros+n.toString(2)).slice(-zeros.length).split('').reverse().join(''),2);
}

/** ランダムな半角カタカナを返す */
function randomKana() {
    return String.fromCharCode(65393+~~(44*Math.random()))
}
