import {sgInit, sgResize, sgDraw} from './shogi13';
import {nsSetSound, Start, nsBack, nsHead, nsTail, nsStep, nsPlay} from './score10';
import '../css/test2.css';

window.onload = function() {
  sgInit();
  Start('../data/pagagm584.kif','s');
  nsSetSound(require('../sound/sound1.mp3'));
  document.querySelector('body').onResize = sgResize;

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
    const f = item.f;
    const img = document.createElement('img');
    img.src = require(`../img/move_${name}.png`);
    img.onclick = f;
    if (name === 'item05') {
      img.id = 'playbutton';
    }
    document.querySelector(`.move_arrow .${name}`)
      .appendChild(img);
  }
}
