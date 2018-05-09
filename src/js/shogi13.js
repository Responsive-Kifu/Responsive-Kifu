import h from 'hyperscript';

//
// 将棋棋譜描画処理
//


export class KifuView {
  // 初期化
  constructor() {
    this.baseX = 0;
    this.baseY = 0;
    this.ratio = 1.0;
    this.pieceW = 36.1;
    this.pieceW2 = 36.1;
    this.pieceH = 39.3;
    this.pieceH2 = 39.3;
    this.handH1 = 35.3;
    this.handH2 = 35.3;
    this.handH12 = 35.3;
    this.handH22 = 35.3;
    this.handCount = 38;
    this.markX = -1;
    this.markY = -1;
    this.markW = 36.0;
    this.markH = 39.0;
    this.markW2 = 36.0;
    this.markH2 = 39.0;
    this.sgPicNames = new Array(
		  'emp',
		  'ou0', 'gy0', 'hi0', 'ry0', 'ka0', 'um0',
		  'ki0', 'gi0', 'gn0', 'ke0', 'kn0', 'ky0', 'kyn0', 'fu0', 'to0',
		  'ou1', 'gy1', 'hi1', 'ry1', 'ka1', 'um1',
		  'ki1', 'gi1', 'gn1', 'ke1', 'kn1', 'ky1', 'kyn1', 'fu1', 'to1',
		  'mark'
    );
    this.sgPic = new Array();

	  let parent = document.querySelector('.board');
	  this.sgResetCoord(parent);


	  for ( var i = 0; i < this.sgPicNames.length; i++ ){
		  const name = this.sgPicNames[i];
		  this.sgPic[name] = new Image();
		  this.sgPic[name].src = require(`../img/pieces/${name}.png`);
	  }

	  // マーカー追加
    {
	    let e = h('img', {id: 'mark', src: this.sgPic.mark.src, alt: '', width: 35, height: 38});
	    if(window.innerWidth<620){
		    e.width=35*(window.innerWidth/620);e.height=38*(window.innerWidth/620);
	    }
	    e.style.position = 'absolute';
	    this.sgShowMark(e);
	    parent.appendChild(e);
    }

	  // 盤面の表示位置
	  this.ratio = 1.0;
	  if(window.innerWidth<620){
		  this.ratio=window.innerWidth/620;
		  this.pieceW2=this.pieceW*this.ratio;
      this.pieceH2=this.pieceH*this.ratio;
		  this.handH12=this.handH1*this.ratio;
      this.handH22=this.handH2*this.ratio;
	  }
	  for ( let i = 0; i < 81; i++ ){
		  let e = h('img', {id: 'g' + i, src: this.sgPic.emp.src, alt: '', width: 36, height: 43});
		  if(window.innerWidth<620){
			  e.width=36*this.ratio;
        e.height=43*this.ratio;
		  }
		  e.style.position = 'absolute';
	    e.style.left = this.baseX + ((8 - i % 9) * this.pieceW2) + 'px';
      //	  if(window.innerWidth < 900){
      //	  	e.style.left = (baseX + ((8 - i % 9) * pieceW)) * (window.innerWidth/900) + 'px';
      //	  }

	    e.style.top  = this.baseY + (Math.floor(i / 9) * this.pieceH2) + 'px';
		  parent.appendChild(e);
	  }
	  // 持駒の表示位置
	  for ( let i = this.handCount - 1; i >= 0; i-- ){
		  let e = h('img', {id: 'ga' + i, src: this.sgPic.emp.src, alt: '', width: 36*this.ratio, height: 43*this.ratio});
		  e.style.position = 'absolute';
		  e.style.left = this.baseX + 345*this.ratio + ((i % 3) * this.pieceW2) + 'px';
		  e.style.top  = this.baseY + 255*this.ratio + (Math.floor(i / 3) * this.handH12) + 'px';
		  parent.appendChild(e);
	  }
	  // 持駒の表示位置
	  for ( let i = this.handCount - 1; i >= 0; i-- ){
		  var e = h('img', {id: 'gb' + i, src: this.sgPic.emp.src, alt: '', width: 36*this.ratio, height: 43*this.ratio});
		  e.style.position = 'absolute';
      e.style.left = this.baseX - 60*this.ratio - ((i % 3) * this.pieceW2) + 'px';
		  e.style.top  = this.baseY + 60*this.ratio - (Math.floor(i / 3) * this.handH22) + 'px';
		  parent.appendChild(e);
	  }

	  this.sgClear();
  }

  // リサイズ時処理
  sgResize() {
	  let parent = document.querySelector('.board');
	  this.sgResetCoord(parent);

	  this.sgShowMark(null);

	  // 盤面の表示位置、駒大きさ、マーク大きさ
	  this.ratio = 1.0;
	  if(window.innerWidth < 620){
		  this.ratio=window.innerWidth/620;
		  this.pieceW2=this.pieceW*this.ratio;
		  this.pieceH2=this.pieceH*this.ratio;
		  this.handH12=this.handH1*this.ratio;
      this.handH22=this.handH2*this.ratio;
		  this.markW2=this.markW*this.ratio;
      this.markH2=this.markH*this.ratio;
		  this.sgShowMark(null);
	  }

	  for ( var i = 0; i < 81; i++ ){
		  var e = document.getElementById('g' + i);
  		e.style.left = this.baseX + ((8 - i % 9) * this.pieceW2) + 'px';
  		e.width=36*this.ratio;
      e.height=43*this.ratio;
		  e.style.top  = this.baseY + (Math.floor(i / 9) * this.pieceH2) + 'px';
	  }

	  // 持駒の表示位置
	  for ( let i = 0; i < this.handCount; i++ ){
		  var e = document.getElementById('ga' + i);
		  e.width = 36*this.ratio;
      e.height = 43*this.ratio;
		  e.style.left = this.baseX + 345*this.ratio + ((i % 3) * this.pieceW2) + 'px';
		  e.style.top  = this.baseY + 255*this.ratio + (Math.floor(i / 3) * this.handH12) + 'px';
	  }
	  // 持駒の表示位置
	  for ( let i = 0; i < this.handCount; i++ ){
		  var e = document.getElementById('gb' + i);
		  e.width = 36*this.ratio;
      e.height = 43*this.ratio;
		  e.style.left = this.baseX - 60*this.ratio - ((i % 3) * this.pieceW2) + 'px';
		  e.style.top  = this.baseY + 60*this.ratio - (Math.floor(i / 3) * this.handH22) + 'px';
	  }
  }

  // 座標再設定
  sgResetCoord(parent) {
    this.baseX = 138;//修正
    this.baseY = 25.5;//修正
    if(window.innerWidth < 620){
	    this.baseX = 138 * (window.innerWidth/620);
	    this.baseY = 25.5 * (window.innerWidth/620);
    }
  }

  // クリア
  sgClear() {
	  for ( var i = 0; i < 81; i++ ){
		  var n = 'emp';
		  switch ( i ){
			case 0: n = 'ky1'; break;
			case 1: n = 'ke1'; break;
			case 2: n = 'gi1'; break;
			case 3: n = 'ki1'; break;
			case 4: n = 'ou1'; break;
			case 5: n = 'ki1'; break;
			case 6: n = 'gi1'; break;
			case 7: n = 'ke1'; break;
			case 8: n = 'ky1'; break;
			case 10: n = 'ka1'; break;
			case 16: n = 'hi1'; break;
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26: n = 'fu1'; break;
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62: n = 'fu0'; break;
			case 64: n = 'hi0'; break;
			case 70: n = 'ka0'; break;
			case 72: n = 'ky0'; break;
			case 73: n = 'ke0'; break;
			case 74: n = 'gi0'; break;
			case 75: n = 'ki0'; break;
			case 76: n = 'gy0'; break;
			case 77: n = 'ki0'; break;
			case 78: n = 'gi0'; break;
			case 79: n = 'ke0'; break;
			case 80: n = 'ky0'; break;
		  }
		  var e = document.getElementById('g' + i);//g0 とかが位置かな
		  e.src = this.sgPic[n].src;
	  }
	  for ( let i = 0; i < this.handCount; i++ ){
		  let e = document.getElementById('ga' + i);
		  e.src = this.sgPic.emp.src;
		  e = document.getElementById('gb' + i);
		  e.src = this.sgPic.emp.src;
	  }
  }

  // 描画
  sgDraw(item) {
	  if ( item == null ) {
		  this.sgClear();
	  } else {
		  // 盤面表示
		  var s = item.p;//
		  //alert(item.p);
		  for ( var i = 0; i < 81; i++ ){
			  let e = document.getElementById('g' + i);
			  let t = parseInt(s.substr(i * 2, 2), 16);//substr(a,b) aの位置からb文字切り出す。parseInt(a,16) a を１６進数で解釈し、１０進数で返す。
			  //alert(t);
			  if ( t <= 31 ){
				  e.src = this.sgPic[this.sgPicNames[t]].src;
			  }
		  }

		  // マーク
		  this.markX = parseInt(item.p.substr(81 * 2,     1));
		  this.markY = parseInt(item.p.substr(81 * 2 + 1, 1));
		  this.sgShowMark(null);

		  // 持駒表示
		  this.sgDrawHand(item.h1, 'ga');
		  this.sgDrawHand(item.h2, 'gb');

		  // コメント表示　item.c が null でなければ内容を表示
		  var u = document.querySelector('.comment');
		  //alert(item.c);
		  if (item.c){
			  //alert(item.c);
			  u.innerText = item.c;
			  u.style.display = '';
		  }else{
			  u.innerText = "";
			  //u.style.display = 'none';
		  }

	  }
  }

  // 持駒描画
  sgDrawHand(hand, id) {
	  var n = hand.length / 2;

	  // 持駒の数によって表示間隔を調整
	  if(window.innerWidth<620){
		  this.ratio=window.innerWidth/620;
	  }
	  var h = (n <= 9)? 35.3*this.ratio: ((90*this.ratio) / Math.floor((n + 2) / 3));
	  if ( id == 'ga' ){
		  if ( this.handH1 != h ){
			  this.handH1 = h;
			  this.sgResize();
		  }
	  } else {
		  if ( this.handH2 != h ){
			  this.handH2 = h;
			  this.sgResize();
		  }
	  }

	  // 持駒を配列に入れて強さの順にソート
	  var pa = new Array();
	  for ( var i = 0; i < n; i++ ){
		  pa[i] = parseInt(hand.substr(i * 2, 2), 16);
	  }
	  pa.sort(function(a, b){ return a - b; });

	  // 持駒表示
	  for ( let i = 0; i < this.handCount; i++ ){
		  var e = document.getElementById(id + i);
		  if ( i < n ){
			  var t = pa[i];
			  if ( t <= 31 ){
				  e.src = this.sgPic[this.sgPicNames[t]].src;
			  }
		  }
		  else{
			  e.src = this.sgPic.emp.src;
		  }
	  }
  }

  cmMoveMark(x, y) {
	  this.markX = x;
	  this.markY = y;
	  this.sgShowMark(null);
  }

  sgShowMark(elem) {
	  var e = (elem != null)? elem: document.getElementById('mark');

	  if (window.innerWidth < 620) {
		  this.ratio = window.innerWidth/620;
		  this.markW2 = this.markW*this.ratio;
      this.markH2 = this.markH*this.ratio;
	  }
	  e.width = 36*this.ratio;
    e.height = 43*this.ratio;
	  if ( (this.markX > 0) && (this.markY > 0) ){
		  e.style.left = (this.baseX + (9 - this.markX) * this.markW2 + 1).toString() + 'px';
		  e.style.top  = (this.baseY + (this.markY - 1) * this.markH2 + 4).toString() + 'px';
		  e.style.display = '';
	  } else {
		  e.style.display = 'none';
	  }
  }
}
