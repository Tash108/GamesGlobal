const canvas = document.getElementById('hanoiCanvas');
const canvasContext = canvas.getContext('2d');
const diskCountInput = document.getElementById('numDisks');
const startGameButton = document.getElementById('startButton');

const rodPositionsX = [150, 300, 450]; // X positions of the rods on the canvas
const rodBaseY = 300; // Y position where disks are stacked on the rods
let rodsArray = [[], [], []]; // Array to hold disks on each rod
let totalDisks = 4; 

// Function to initialize the rods with disks
function initializeRods() {
    rodsArray = [[], [], []]; // Reset rods
    for (let diskSize = totalDisks; diskSize > 0; diskSize--) {
        rodsArray[0].push(diskSize); // Place all disks on the first rod
    }
    drawGame(); // Call the function to draw the initial setup
}

// Function to draw the rods and disks
function drawGame() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw rods
    for (let rodIndex = 0; rodIndex < 3; rodIndex++) {
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(rodPositionsX[rodIndex] - 5, 100, 10, 200); // Draw each rod
    }

    // Draw disks on the rods
    for (let rodIndex = 0; rodIndex < 3; rodIndex++) {
        for (let diskIndex = 0; diskIndex < rodsArray[rodIndex].length; diskIndex++) {
            const diskSize = rodsArray[rodIndex][diskIndex];
            const diskWidth = diskSize * 20;
            const diskHeight = 20;
            const diskX = rodPositionsX[rodIndex] - diskWidth / 2;
            const diskY = rodBaseY - (diskIndex + 1) * diskHeight;
            canvasContext.fillStyle = `hsl(${diskSize * 40}, 70%, 50%)`; // Color based on disk size
            canvasContext.fillRect(diskX, diskY, diskWidth, diskHeight); // Draw the disk
        }
    }
}

// Recursive function to solve the Tower of Hanoi
function solveHanoi(diskCount, fromRod, toRod, auxiliaryRod, moveCallback) {
    if (diskCount === 0) return;

    solveHanoi(diskCount - 1, fromRod, auxiliaryRod, toRod, moveCallback); // Move n-1 disks to auxiliary rod
    moveCallback(fromRod, toRod); // Move the nth disk to the target rod
    solveHanoi(diskCount - 1, auxiliaryRod, toRod, fromRod, moveCallback); 
}

// Function to animate the moves
function animateMoves(moves) {
    if (moves.length === 0) return; // No more moves left

    const [fromRod, toRod] = moves.shift(); // Get the next move
    rodsArray[toRod].push(rodsArray[fromRod].pop()); // Move the top disk from one rod to another
    drawGame(); // Redraw the game scene

    setTimeout(() => animateMoves(moves), 1000); // Delay for animation
}

// Start game function
function startGame() {
    totalDisks = parseInt(diskCountInput.value);
    initializeRods();

    const moves = [];
    solveHanoi(totalDisks, 0, 2, 1, (fromRod, toRod) => {
        moves.push([fromRod, toRod]); // Collect the moves
    });

    animateMoves(moves); 
}

// Add event listener for starting the game
startGameButton.addEventListener('click', startGame);
