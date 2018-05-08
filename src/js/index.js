import {sgInit, sgResize, sgDraw} from './shogi13';
import {nsSetSound, Start, loadKif, nsBack, nsHead, nsTail, nsStep, nsPlay, nsSoundToggle} from './score10';
import h from 'hyperscript';
import '../css/style.scss';

function setupBottom(root) {
  const bottom = root.appendChild(h('div.bottom'));

  const soundSelect = h('div.sound-select', [
    h('input', {type: 'checkbox',
                onchange: () => nsSoundToggle(i)}),
    h('label', '駒音再生')
  ]);
  bottom.appendChild(soundSelect);

  const moveArrow = h('div.move-arrow');
  bottom.appendChild(moveArrow);

  const items = [
    {name: 'item02', f: () => nsHead(sgDraw)},
    {name: 'item03', f: () => nsBack(sgDraw, 10)},
    {name: 'item04', f: () => nsBack(sgDraw, 1)},
    {name: 'item05', f: () => nsPlay(sgDraw)},
    {name: 'item06', f: () => nsStep(sgDraw, 1)},
    {name: 'item07', f: () => nsStep(sgDraw, 10)},
    {name: 'item08', f: () => nsTail(sgDraw)},
  ];
  for (const item of items) {
    const name = item.name;
    const img = h('img', {src: require(`../img/move_${name}.png`),
                          onclick: item.f});
    if (name === 'item05') {
      img.id = 'playbutton';
    }
    moveArrow.appendChild(h(`span.${name}`, [img]));
  }
  bottom.appendChild(h('p.move'));
  bottom.appendChild(h('textarea.comment'));
}

function setupBoard(root) {
  const board = root.appendChild(h('div.board'));
  board.appendChild(h('span.p1type'));
  board.appendChild(h('span.p1name'));
  board.appendChild(h('span.p1title'));
  board.appendChild(h('span.p1title2'));
  board.appendChild(h('span.p2type'));
  board.appendChild(h('span.p2name'));
  board.appendChild(h('span.p2title'));
  board.appendChild(h('span.p2title2'));
}

function setupTop(root) {
  const top = root.appendChild(h('div.top'));
  top.appendChild(h('p.date', [
    h('span.scyear'),
    h('span.sctitle'),
    h('span.scstage'),
  ]));
}

window.onload = () => {
  const figs = document.querySelectorAll('.responsive-kifu');
  for (const fig of figs) {
    const kif = fig.textContent;
    fig.textContent = '';
    setupTop(fig);
    setupBoard(fig);
    setupBottom(fig);
    sgInit();
    loadKif(kif);
    // Start('../data/pagagm584.kif','s');
    nsSetSound(require('../sound/sound1.mp3'));
    document.querySelector('body').onResize = sgResize;
    fig.classList.add('show');
  }
}
