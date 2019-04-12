const board= document.getElementById('grid');

function makeGrid(){
  for(let i=1; i<=121;i++){
  let square=document.createElement('div');
  square.setAttribute("id",`${i}`);
  board.appendChild(square);
  }
}

makeGrid();
addPieces();


function addPieces(){
  const whiteArr=[39,49,50,51,59,60,61,62,63,71,72,73,83];
  const blackArr=[4,5,6,7,8,17,34,45,56,57,67,78,44,55,65,66,77,88,114,115,116,117,118,105];
  whiteArr.forEach(spot=>{
    const peice=document.createElement('div');
    peice.classList.add("circle");
    peice.classList.add("white");
    const location=document.getElementById(`${spot}`);
    location.appendChild(peice);
    if(spot===61){
      peice.setAttribute("id","king");
    }
  });
  blackArr.forEach(spot=>{
    const peice=document.createElement('div');
    peice.classList.add("circle");
    peice.classList.add("black");
    const location=document.getElementById(`${spot}`);
    location.appendChild(peice);
  });
}
