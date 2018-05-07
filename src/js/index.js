import {sgInit, sgResize, sgDraw} from './shogi13';
import {nsSetSound, Start, nsBack, nsHead, nsTail, nsStep, nsPlay, nsSoundToggle} from './score10';
import '../css/test2.css';

function setupBottom() {
  const bottom = document.getElementById("bottom");

  const soundSelect = document.createElement('div');
  soundSelect.id = 'sound-select';
  bottom.appendChild(soundSelect);
  soundSelect
    .appendChild((() => {
      const i = document.createElement('input');
      i.type = 'checkbox';
      i.onchange = () => nsSoundToggle(i);
      return i;
    })());
  soundSelect
    .appendChild((() => {
      const l = document.createElement('label');
      l.appendChild(document.createTextNode('駒音再生'));
      return l;
    })());

  const moveArrow = document.createElement("div");
  moveArrow.classList.add('move-arrow');
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
    const f = item.f;
    const img = document.createElement('img');
    img.src = require(`../img/move_${name}.png`);
    img.onclick = f;
    if (name === 'item05') {
      img.id = 'playbutton';
    }
    const span = document.createElement("span");
    span.classList.add(name);
    span.appendChild(img);
    moveArrow.appendChild(span);
  }
  const p = document.createElement("p");
  p.classList.add("move");
  p.id = "move";
  bottom.appendChild(p);

  const textarea = document.createElement("textarea");
  textarea.id = "comment";
  bottom.appendChild(textarea);
}

window.onload = () => {
  sgInit();
  Start('../data/pagagm584.kif','s');
  nsSetSound(require('../sound/sound1.mp3'));
  document.querySelector('body').onResize = sgResize;
  setupBottom();
}
