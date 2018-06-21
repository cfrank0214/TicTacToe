/**
 * Program for playing basic Tic-Tac-Toe
 *
 * @author chris.frank michael.felix tim.rose
 */

function updateBoard(node) {
  node.innerHTML = 'X';
  console.log(node); 
}


// Get all buttons with class="box" inside the container
var cells = document.getElementsByClassName("box");
console.log(cells);
for (var box of cells) {
  box.addEventListener("click", function() {
    updateBoard(box);
    
  });

}
// cells.forEach(box => {
//   box.addEventListener("click", function() {
//     updateBoard(box);
    
//   });
// });


// Loop through the buttons and add the active class to the current/clicked button

 
  // var box = document.getElementById("1");
  // box.addEventListener("click", function() {
  //   updateBoard(box);
    
  // });

