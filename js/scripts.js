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
  this.destination={};
  }

  makeBoard(){
    for(let x=0;x<=10;x++){
      for(let y=0;y<=10;y++){
        let cell=document.createElement('div');
        cell.classList.add(`${this.grid[x][y]}`);
        cell.setAttribute('id',`r${x}c${y}`);
        board.appendChild(cell);
        cell.addEventListener("click",()=>{
          this.move(x,y,this.grid[x][y],cell);
        });
      };
    };
  };

  move(x,y,piece,cell){
    if (this.selected.piece!=='empty'){
        this.destination.x=x;
        this.destination.y=y;
      if(this.moveIsValid()){
        this.checkCapture();
        this.changeTurn();
        this.grid[x][y]=this.selected.piece;
        this.checkIfKingCaptured();
        this.selected={piece:'empty'};
        this.destination={};
        this.updateView(x,y,cell,piece);
      } else{
        this.grid[this.selected.row][this.selected.col]=this.selected.piece;
        this.updateView(this.selected.row,this.selected.col,this.selected.cell);
        this.selected={piece:'empty'};
        this.updateCursor();
      }
    } else {
      if(piece===this.turn || (piece==='king'&&this.turn==='white')){
        this.selected.row=x;
        this.selected.col=y;
        this.selected.piece=this.grid[x][y];
        this.selected.cell=cell;
        this.grid[x][y]='empty';
        this.updateView(x,y,cell);
      }
    }
  }
  checkCapture(){
    let x=this.destination.x;
    let y=this.destination.y;
    if(this.turn==='black'){
      console.log("black turn");
        if(x<9){
          if(this.grid[x+1][y]==='white' && this.grid[x+2][y]==='black'){
          console.log('capture bottom',this.grid[x+1][y]);
          this.grid[x+1][y]='empty';
          let captured=document.getElementById(`r${x+1}c${y}`);
          captured.setAttribute('class','empty');
          }
        }
        if(x>1){
          if(this.grid[x-1][y]==='white' && this.grid[x-2][y]==='black'){
          console.log('capture top',this.grid[x-1][y]);
          this.grid[x-1][y]='empty';
          let captured=document.getElementById(`r${x-1}c${y}`);
          captured.setAttribute('class','empty');
          }
        }
      if(y<9){
        if(this.grid[x][y+1]==='white' && this.grid[x][y+2]==='black'){
        console.log('capture right',this.grid[x][y+1]);
        this.grid[x][y+1]='empty';
        let captured=document.getElementById(`r${x}c${y+1}`);
        captured.setAttribute('class','empty');
        }
      }
      if(y>1){
        if(this.grid[x][y-1]==='white' && this.grid[x][y-2]==='black'){
        console.log('capture left',this.grid[x][y-1]);
        this.grid[x][y-1]='empty';
        let captured=document.getElementById(`r${x}c${y-1}`);
        captured.setAttribute('class','empty');
        }
      }
    } else if(this.turn==='white'){
      console.log("white turn");
      if(x<9){
        if(this.grid[x+1][y]==='black' && this.grid[x+2][y]==='white'||this.grid[x+2][y]==='king'){
        console.log('capture bottom',this.grid[x+1][y]);

        this.grid[x+1][y]='empty';
        let captured=document.getElementById(`r${x+1}c${y}`);
        captured.setAttribute('class','empty');
        }
      }
      if(x>1){
        if(this.grid[x-1][y]==='black' && this.grid[x-2][y]==='white'||this.grid[x-2][y]==='king'){
        console.log('capture top',this.grid[x-1][y]);
        this.grid[x-1][y]='empty';
        let captured=document.getElementById(`r${x-1}c${y}`);
        captured.setAttribute('class','empty');
        }
      }
      if(y<9){
        if(this.grid[x][y+1]==='black' && this.grid[x][y+2]==='white'||this.grid[x][y+2]==='king'){
        console.log('capture right',this.grid[x][y+1]);

        this.grid[x][y+1]='empty';
        let captured=document.getElementById(`r${x}c${y+1}`);
        captured.setAttribute('class','empty');
        }
      }
      if(y>1){
        if(this.grid[x][y-1]==='black' && this.grid[x][y-2]==='white'||this.grid[x][y-2]==='king'){
        console.log('capture left',this.grid[x][y-1]);

        this.grid[x][y-1]='empty';
        let captured=document.getElementById(`r${x}c${y-1}`);
        captured.setAttribute('class','empty');
        }
      }
    }
  }

  changeTurn(){
    if(this.selected.piece==='white'||this.selected.piece==='king'){
      this.turn='black';
      turnView.innerHTML="Attacking Team";
    } else if(this.selected.piece==='black'){
      this.turn='white';
      turnView.innerHTML="Defending Team";
    }
  }

  moveIsValid(){
    if(this.destination.x===this.selected.row || this.destination.y===this.selected.col){
      if(this.selected.piece!=='king' && this.grid[this.destination.x][this.destination.y]==='goal'){
        return false;
      }
      if(this.selected.piece==='king' && this.grid[this.destination.x][this.destination.y]==='goal'){
        window.location.replace('defenseWins.html');
        return true;
      }
      if(this.selected.row>this.destination.x){
        for(let i=this.selected.row;i>=this.destination.x;i--){
          if(this.grid[i][this.destination.y]!=='empty'){
            return false;
          }
        }
        return true;
      }
      if(this.selected.row<this.destination.x){
        for(let i=this.selected.row;i<=this.destination.x;i++){
          if(this.grid[i][this.destination.y]!=='empty'){
            return false;
          }
        }
        return true;
      }
      if(this.selected.col>this.destination.y){
        for(let i=this.selected.col;i>=this.destination.y;i--){
          if(this.grid[this.destination.x][i]!=='empty'){
            return false;
          }
        }
        return true;
      }
      if(this.selected.col<this.destination.y){
        for(let i=this.selected.col;i<=this.destination.y;i++){
          if(this.grid[this.destination.x][i]!=='empty'){
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

  updateView(x,y,cell){
    cell.setAttribute('class',this.grid[x][y]);
    this.updateCursor()
  }
  updateCursor(){
    if(this.selected.piece==='white'){
      board.setAttribute('class','selectedWhite');
    } else if(this.selected.piece==='black'){
      board.setAttribute('class','selectedBlack');
    } else if(this.selected.piece==='king'){
      board.setAttribute('class','selectedKing');
    } else {
      board.setAttribute('class','noneSelected');
    }
  }
  checkIfKingCaptured(){
    for(let x=0;x<=10;x++){
      for(let y=0;y<=10;y++){
        if(this.grid[x][y]==='king'){
          console.log('king is at',x,y)
          if(this.grid[x+1][y]==='black'&&this.grid[x-1][y]==='black'&&this.grid[x][y+1]==='black'&&this.grid[x][y-1]==='black'){
            window.location.replace('offenseWins.html');
          }
        }
      };
    };
  }
}
let newGame= new Board();
newGame.makeBoard();
