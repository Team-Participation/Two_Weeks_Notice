/* tiles are set so that when each tile is a square, the aspect
 * ratio is 16*9. This is just temporary.
 */
const TILESIZE = 48;
const HEIGHT = 18;
const WIDTH = 32;
//this is how many frames it takes to move 1 tile
const MOVETIME = 15;
const error = 0;

function update()
{
    playerMovement();
    render();
}