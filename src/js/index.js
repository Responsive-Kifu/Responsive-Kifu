import {KifuView} from './shogi13';
import {nsSetSound, Start, loadKif, nsBack, nsHead, nsTail, nsStep, nsPlay, nsSoundToggle} from './score10';
import h from 'hyperscript';
import '../css/style.scss';

function setupBottom(root, view) {
  const bottom = root.appendChild(h('div.bottom'));

  const input = h('input', {type: 'checkbox'});
  input.onchange = () => nsSoundToggle(input.checked);
  const soundSelect = h('div.sound-select', [
    input,
    h('label', '駒音再生')
  ]);
  bottom.appendChild(soundSelect);

  const moveArrow = h('div.move-arrow');
  bottom.appendChild(moveArrow);

  const items = [
    {name: 'item02', f: () => nsHead(view)},
    {name: 'item03', f: () => nsBack(view, 10)},
    {name: 'item04', f: () => nsBack(view, 1)},
    {name: 'item05', f: () => nsPlay(view)},
    {name: 'item06', f: () => nsStep(view, 1)},
    {name: 'item07', f: () => nsStep(view, 10)},
    {name: 'item08', f: () => nsTail(view)},
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
    let kifuView = new KifuView();
    setupBottom(fig, kifuView);
    loadKif(kif);
    // Start('../data/pagagm584.kif','s');
    nsSetSound(require('../sound/sound1.mp3'));
    document.querySelector('body').onResize = kifuView.sgResize.bind(kifuView);
    fig.classList.add('show');
  }
}
