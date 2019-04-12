const board= document.getElementById('grid');
makeGrid();
addPieces();

function makeGrid(){
  for(let i=1; i<=121;i++){
  let square=document.createElement('div');
  square.setAttribute("id",`${i}`);
  board.appendChild(square);
  }
}

function addPieces(){
  const whiteArr=[39,49,50,51,59,60,61,62,63,71,72,73,83];
  const blackArr=[4,5,6,7,8,17,34,45,56,57,67,78,44,55,65,66,77,88,114,115,116,117,118,105];
  whiteArr.forEach(spot=>{
    const piece=document.createElement('div');
    piece.classList.add("circle");
    piece.classList.add("white");
    const location=document.getElementById(`${spot}`);
    location.appendChild(piece);
    if(spot===61){
      piece.setAttribute("id","king");
    }
  });
  blackArr.forEach(spot=>{
    const piece=document.createElement('div');
    piece.classList.add("circle");
    piece.classList.add("black");
    const location=document.getElementById(`${spot}`);
    location.appendChild(piece);

  });
}


movePiece(from,to){
  let previous=document.getElementByI(`${from}`);
  let current=document.getElementById(`${to}`);
  let piece=previous.children;

}
