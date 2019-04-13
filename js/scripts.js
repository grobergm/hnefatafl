class Board{
  constructor(){
  this.turn='black';
  this.grid=[
    ['goal','empty','empty','black','black','black','black','black','empty','empty','goal'],
    ['empty','empty','empty','empty','empty','black','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],
    ['black','empty','empty','empty','empty','white','empty','empty','empty','empty','black'],
    ['black','empty','empty','empty','white','white','white','empty','empty','empty','black'],
    ['black','empty','empty','white','white','king','white','white','empty','empty','black'],
    ['black','empty','empty','empty','white','white','white','empty','empty','empty','black'],
    ['black','empty','empty','empty','empty','white','empty','empty','empty','empty','black'],
    ['empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','black','empty','empty','empty','empty','empty'],
    ['goal','empty','empty','black','black','black','black','black','empty','empty','goal']
  ];
  this.selected={};
  }

  startGame(){
    const board= document.getElementById('board');
    for(let x=0;x<=10;x++){
      for(let y=0;y<=10;y++){
        let cell=document.createElement('div');
        cell.classList.add(`${this.grid[x][y]}`);
        board.appendChild(cell);
        cell.addEventListener("click", ()=>{
          this.selected.row=x;
          this.selected.col=y;
          console.log(this.selected,this.grid[x][y])
        });
      };
    };
  };
}
let newGame= new Board();
newGame.startGame();
  //
  // checkRow(x1,x2){
  //
  //   if (x1>x2){
  //     for(let i=x1,i<=x2;i++){
  //       if this.grid[i]
  //     }
  //   } else if (x2>x1){
  //
  //   }
  //
  // }
  // startGame(){
  //   this.grid
  // }
  // changeTurn(){
  //   let next='';
  //   this.turn==='black' ? next='white' : next='black';
  //   this.turn=next;
  // }
  // selectPiece(piece){
  //   if(this.turn===piece.color){
  //     this.selected=piece;
  //   } else {
  //     this.selected=null;
  //   }
  // }
  //
  // placePiece(gridId){
  //
  //   if()
  //   this.selected.id=gridId;
  // }
  //   changeTurn();
  // }

// }



// 
// makeGrid();
// addPieces();

// function makeGrid(){
//   for(let i=1; i<=121;i++){
//   let square=document.createElement('div');
//   square.setAttribute("id",`${i}`);
//   board.appendChild(square);
//   }
// }
//
//
//
//
// function selectPiece(id){
//   let =document.getElementById(`${from}`);
//   let current=document.getElementById(`${to}`);
//   // select piece
//   current.appendChild(piece);
//   previous.removeChild(piece);
// }
//
//
//
// movePiece(61,1);
