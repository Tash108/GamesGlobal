let deg = 0; // Starting degree for pointer
const zoneSize = 360 / 6; // Each segment now covers 60 degrees
const result = document.getElementById('result');
const wheel = document.getElementById('wheel');
const prizeSelect = document.getElementById('prizeSelect'); 
const spinBtn = document.getElementById('spinBtn');

// Load the ticking sound and set the volume
const tickSound = new Audio('tick.mp3');
tickSound.volume = 1.0; // Set volume to maximum

// Reassigned Wheel prizes and colors
const prizes = [100, 200, 300, 400, 500, 600]; // Reassigned the values
const colors = ['#FF5733', '#FF7043', '#33FF57', '#70FF43', '#3357FF', '#4370FF'];

// Draw the Wheel with 6 segments
function drawWheel() {
    const wheelContext = wheel.getContext('2d');
    let startAngle = 0;
    const arcSize = (2 * Math.PI) / prizes.length;

    // Clear previous drawings
    wheelContext.clearRect(0, 0, wheel.width, wheel.height);

    // Draw each segment with alternating colors
    for (let i = 0; i < prizes.length; i++) {
        wheelContext.beginPath();
        wheelContext.moveTo(150, 150); 
        wheelContext.arc(150, 150, 150, startAngle, startAngle + arcSize, false);
        wheelContext.fillStyle = colors[i]; 
        wheelContext.fill();
        wheelContext.strokeStyle = "#000"; 
        wheelContext.lineWidth = 2; 
        wheelContext.stroke();
        wheelContext.closePath();
        
        
        wheelContext.save();
        wheelContext.translate(150, 150);
        wheelContext.rotate(startAngle + arcSize / 2);
        wheelContext.textAlign = "right";
        wheelContext.fillStyle = "#000";
        wheelContext.font = "bold 16px Arial";
        wheelContext.fillText(`${prizes[i]} ZAR`, 130, 5); 
        wheelContext.restore();

        startAngle += arcSize;
    }
}

// Spin the wheel function with adjusted prize calculation based on segment index
function spinWheel() {
    deg = 0;  
    wheel.style.transform = `rotate(${deg}deg)`;

    const selectedPrize = parseInt(prizeSelect.value);
    const selectedIndex = prizes.indexOf(selectedPrize); // Find the index of the selected prize
    console.log(`Selected index: ${selectedIndex}`);
    
    // Add a random amount of full spins 
    const randomFullRotations = Math.floor(6 + Math.random() * 4) * 360;

    
    let targetDeg;
    
    // Adjust the targetDeg based on the segment index
    if (selectedIndex === 0) {
        targetDeg = 240;
    } else if (selectedIndex === 1) {
        targetDeg = 180;
    } else if (selectedIndex === 2) {
        targetDeg = 120;
    } else if (selectedIndex === 3) {
        targetDeg = 60;
    } else if (selectedIndex === 4) {
        targetDeg = 0; 
    } else if (selectedIndex === 5) {
        targetDeg = 300; 
    }

    console.log(`Target degrees: ${targetDeg}`);

    // Final spin amount is a combination of random full rotations and the target degrees for the prize
    const spinAmount = randomFullRotations + targetDeg;

    // Track the time in seconds
    let spinTime = 0;
    const timeInterval = setInterval(() => {
        spinTime++;
        console.log(`Spin time: ${spinTime} second(s)`); // Log spin time each second
    }, 1000);

    // Play the ticking sound at regular intervals (e.g., every 100ms)
    let tickInterval = setInterval(() => {
        tickSound.currentTime = 0;
        tickSound.play();
    }, 100);

    wheel.style.transition = 'all 5s ease-out';  // Smooth transition
    wheel.style.transform = `rotate(${spinAmount}deg)`;  // Apply the spin

    wheel.addEventListener('transitionend', () => {
        clearInterval(timeInterval); // Stop the timer once the spin ends
        clearInterval(tickInterval); // Stop the ticking sound once the spin ends
        tickSound.pause(); // Stop the sound
        tickSound.currentTime = 0; // Reset the sound

        const landedPrize = prizes[selectedIndex];

        console.log(`Spin Amount: ${spinAmount}`);
        console.log(`Prize: ${landedPrize}ZAR`);

        result.innerText = `You won: ${landedPrize}ZAR`;
    }, { once: true });
}

// Event listener for spin button
spinBtn.addEventListener('click', spinWheel);

// Initial drawing of the wheel with 6 segments
drawWheel();
