const board= document.getElementById('board');
const turnView= document.getElementById('turn');

class Board{
  constructor(){
  this.turn='white';
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
      if(this.moveIsValid(x,y)){
        this.changeTurn(this.selected.piece);
        this.grid[x][y]=this.selected.piece;
        this.selected={piece:'empty'};
        this.updateView(x,y,cell,piece);
      }
    } else {
      if(piece===this.turn || (piece==='king'&&this.turn==='white')){
        this.selected.row=x;
        this.selected.col=y;
        this.selected.piece=this.grid[x][y];
        this.grid[x][y]='empty';
        this.updateView(x,y,cell,piece);
      }
    }
  }

  changeTurn(piece){
    console.log('turn change',piece,this.turn)
    if(piece===('white'||'king')){
      this.turn='black';
      turnView.innerHTML="Black's Move";
    } else if(piece==='black'){
      this.turn='white';
      turnView.innerHTML="White's Move";
    }
  }

  moveIsValid(x,y){
    if(x===this.selected.row || y===this.selected.col){
      if(this.selected.row>x){
        for(let i=this.selected.row;i>=x;i--){
          if(this.grid[i][y]!=='empty'){
            return false;
          }
        }
        return true;
      }
      if(this.selected.row<x){
        for(let i=this.selected.row;i<=x;i++){
          if(this.grid[i][y]!=='empty'){
            return false;
          }
        }
        return true;
      }
      if(this.selected.col>y){
        for(let i=this.selected.col;i>=y;i--){
          if(this.grid[x][i]!=='empty'){
            return false;
          }
        }
        return true;
      }
      if(this.selected.col<y){
        for(let i=this.selected.col;i<=y;i++){
          if(this.grid[x][i]!=='empty'){
            return false;
          }
        }
        return true;
      }
    }
    else{
      return false;
    }
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
