var num=null ;
let tile=null ;
numSelected=null ;
error=0;
let p=1;
function setLevel(level){
  localStorage.setItem("gameLevel", level);
}
let ok=0;
let puzzle = []
let solution = []
puzzle1= [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
]
solution1= [
  ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
  ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
  ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
  ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
  ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
  ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
  ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
  ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
  ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
]
puzzle2= [
  [".", ".", "5", "3", ".", ".", ".", ".", "."],
  ["8", ".", ".", ".", ".", ".", ".", "2", "."],
  [".", "7", ".", ".", "1", ".", "5", ".", "."],
  ["4", ".", ".", ".", ".", "5", "3", ".", "."],
  [".", "1", ".", ".", "7", ".", ".", ".", "6"],
  [".", ".", "3", "2", ".", ".", ".", "8", "."],
  [".", "6", ".", "5", ".", ".", ".", ".", "9"],
  [".", ".", "4", ".", ".", ".", ".", "3", "."],
  [".", ".", ".", ".", ".", "9", "7", ".", "."],
]
solution2= [
  ["1", "4", "5", "3", "2", "7", "6", "9", "8"],
  ["8", "3", "9", "6", "5", "4", "1", "2", "7"],
  ["6", "7", "2", "9", "1", "8", "5", "4", "3"],
  ["4", "9", "6", "1", "8", "5", "3", "7", "2"],
  ["2", "1", "8", "4", "7", "3", "9", "5", "6"],
  ["7", "5", "3", "2", "9", "6", "4", "8", "1"],
  ["3", "6", "7", "5", "4", "2", "8", "1", "9"],
  ["9", "8", "4", "7", "6", "1", "2", "3", "5"],
  ["5", "2", "1", "8", "3", "9", "7", "6", "4"],
]


puzzle3= [
  [".", ".", ".", ".", ".", ".", "8", ".", "4"],
  [".", "2", ".", ".", ".", "3", ".", ".", "."],
  [".", ".", "1", ".", "2", ".", ".", ".", "9"],
  [".", ".", "7", "5", ".", ".", ".", ".", "."],
  [".", "6", ".", ".", ".", ".", ".", "3", "."],
  [".", ".", ".", ".", ".", "9", "7", ".", "."],
  ["9", ".", ".", ".", "6", ".", "3", ".", "."],
  [".", ".", ".", "7", ".", ".", ".", "9", "."],
  ["6", ".", "2", ".", ".", ".", ".", ".", "."],
]
solution3= [
  ["7", "3", "9", "6", "5", "2", "8", "1", "4"],
  ["5", "2", "4", "1", "9", "3", "6", "7", "8"],
  ["8", "6", "1", "4", "2", "7", "5", "3", "9"],
  ["3", "9", "7", "5", "8", "6", "2", "4", "1"],
  ["2", "6", "5", "9", "7", "1", "4", "3", "8"],
  ["4", "1", "8", "3", "6", "9", "7", "5", "2"],
  ["9", "7", "6", "8", "4", "5", "3", "2", "1"],
  ["1", "4", "3", "7", "2", "8", "9", "6", "5"],
  ["6", "5", "2", "9", "1", "3", "8", "7", "4"],
]
second=0 ;
window.onload = function() {
  setgame();
  setInterval(updateTime, 1000);
}

function testwin() {
  let i=0;
  let j=0;
  test=0;
  while (i<9 && test==0){
    while (j<9 && test==0){
      id=i.toString() +'-'+j.toString()
      tile=document.getElementById(id);
      if( tile.innerHTML != solution[i][j] ){
        test=1;
      }
      j++;
    }
    i++;
  }
  if (test==0){
    alert("Congratulation you win ");
  }
}
function updateTime(){
  second++;
  if (ok==0){
    if (((second/3600)>=1) && (ok==0)){
      sol();
      return ;
    }
   

    let mine = Math.floor(second/60);
    let sec=second%60;
    let ch="";
    if (mine==0){ ch="00:"}
    else {
      if (mine<10) { ch='0'+mine.toString()+':' } else {ch=mine.toString()+':'}
    }
    
    if (sec<10) { ch=ch+'0'+sec.toString() } else { ch=ch+sec.toString()}
    document.getElementById("time0").innerText=ch;
  }

}



function setgame() {
  for (let i=1; i<=9;i++){
    let number=document.createElement('div') ;
    number.id = i;
    number.innerText = i;
    
    number.classList.add("number") ;
    number.addEventListener("click", selectNumber);
    document.getElementById("digit").appendChild(number);

  }
  // Select the puzzle 
  p = localStorage.getItem("gameLevel");

  if (p==1){
    puzzle=puzzle1;
    solution=solution1;
  }
  if (p==2){
    puzzle=puzzle2
    solution=solution2
  }
  if (p==3){
    puzzle=puzzle3;
    solution=solution3;
  }
  
  for (let r=0;r<9;r++){
    for (let c=0;c<9;c++){
      let tile=document.createElement("div") ;
      tile.id=r.toString() +'-'+c.toString();
      tile.classList.add("tile");
      if (puzzle[r][c]=="."){
        tile.innerText= "";
      }
      else {
        tile.innerText= puzzle[r][c];
        tile.classList.add("tile-event");
      }
      if (r==2 || r==5 ){
        tile.classList.add("h-l");
      }
      if (c==2 || c==5 ){
        tile.classList.add("v-l")
      }


      tile.addEventListener("click", (event) => selectedTile(event, r, c));
      document.getElementById("board").appendChild(tile);


    }
  }

}

function selectNumber(event) {
  if (numSelected!=null) {
    numSelected.classList.remove("number-selected");
  }
    numSelected = event.target; 
    numSelected.classList.add("number-selected");
}

function selectedTile(event,r,c){
  if (numSelected) {
    this1=event.target;
    if (this1.innerText != "" && this1.innerText==solution[r][c] ){
      return ;
    }
    if (numSelected.id==solution[r][c] ){
      this1.classList.remove("ff");
    }
    else{
      error++;
      if (error>3){
        sol();
        return;
      }
      document.getElementById("errors").innerHTML=error;
      this1.classList.add("ff");

    }
    this1.innerText=numSelected.id;
    testwin();
  }

  
}

function sol(){
  alert("You lose :)");
  //document.getElementById("sudoku").innerText="NOOOOOOB";
  for (let r=0;r<9;r++){
    for (let c=0;c<9;c++){
      id=r.toString() +'-'+c.toString()
      tile=document.getElementById(id);
      if (tile.innerText != solution[r][c]){
        
        
        tile.classList.add("lose");
        tile.innerText= solution[r][c];
      }

    }
  }
  ok=1;
}