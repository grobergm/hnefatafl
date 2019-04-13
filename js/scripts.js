const board= document.getElementById('board');

class Board{
  constructor(){
  this.turn='black';
  this.grid=[
    ['goal','empty','empty','black','black','black','black','black','empty','empty','goal'],
    ['empty','empty','empty','empty','empty','black','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],
    ['black','empty','empty','empty','empty','white','empty','empty','empty','empty','black'],
    ['black','empty','empty','empty','white','white','white','empty','empty','empty','black'],
    ['black','black','empty','white','white','king','white','white','empty','black','black'],
    ['black','empty','empty','empty','white','white','white','empty','empty','empty','black'],
    ['black','empty','empty','empty','empty','white','empty','empty','empty','empty','black'],
    ['empty','empty','empty','empty','empty','empty','empty','empty','empty','empty','empty'],
    ['empty','empty','empty','empty','empty','black','empty','empty','empty','empty','empty'],
    ['goal','empty','empty','black','black','black','black','black','empty','empty','goal']
  ];
  this.selected={piece:'empty'};
  }

  makeBoard(){
    for(let x=0;x<=10;x++){
      for(let y=0;y<=10;y++){
        let cell=document.createElement('div');
        cell.classList.add(`${this.grid[x][y]}`);
        board.appendChild(cell);
        cell.addEventListener("click",()=>{
          this.move(x,y,this.grid[x][y],cell);
        });
      };
    };
  };

  move(x,y,piece,cell){
    if (this.selected.piece!=='empty'){

      this.grid[x][y]=this.selected.piece;
      this.selected={piece:'empty'};
      this.updateView(x,y,cell,piece);
    } else {
      this.selected.row=x;
      this.selected.col=y;
      this.selected.piece=this.grid[x][y];
      this.grid[x][y]='empty';
      this.updateView(x,y,cell,piece);
    }
    console.log(this.selected,this.grid);
  }

  updateView(x,y,cell,piece){
    cell.setAttribute('class',this.grid[x][y]);
    if(piece==='white'){
      board.setAttribute('class','selectedWhite');
    } else if(piece==='black'){
      board.setAttribute('class','selectedBlack');
    } else if(piece==='king'){
      board.setAttribute('class','selectedKing');
    } else {
      board.setAttribute('class','noneSelected');
    }
  }
}
let newGame= new Board();
newGame.makeBoard();
