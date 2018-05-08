import {sgInit, sgResize, sgDraw} from './shogi13';
import {nsSetSound, Start, nsBack, nsHead, nsTail, nsStep, nsPlay, nsSoundToggle} from './score10';
import h from 'hyperscript';
import '../css/style.scss';

function setupBottom() {
  const bottom = document.getElementById("bottom");

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
  bottom.appendChild(h('p.move#move'));
  bottom.appendChild(h('textarea#comment'));
}

window.onload = () => {
  sgInit();
  Start('../data/pagagm584.kif','s');
  nsSetSound(require('../sound/sound1.mp3'));
  document.querySelector('body').onResize = sgResize;
  setupBottom();
}
