// Get DOM elements
const logoCanvas = document.getElementById('logo-canvas');
const ctx = logoCanvas.getContext('2d');

// State management
const state = {
    text: 'LOGO',
    fontFamily: 'Arial',
    textColor: '#000000',
    fontGradient: 'none',
    fontGradientStart: '#ff0000',
    fontGradientEnd: '#00ff00',
    backgroundColor: '#ffffff',
    backgroundShape: 'none',
    backgroundGradient: 'none',
    backgroundGradientStart: '#ff0000',
    backgroundGradientEnd: '#00ff00',
    fontSize: 48
};

// Helper functions
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Drawing functions
function drawBackground() {
    const { width, height } = logoCanvas;

    // Set background fill style
    if (state.backgroundGradient === 'linear') {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, state.backgroundGradientStart);
        gradient.addColorStop(1, state.backgroundGradientEnd);
        ctx.fillStyle = gradient;
    } else if (state.backgroundGradient === 'radial') {
        const gradient = ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, Math.min(width, height) / 2
        );
        gradient.addColorStop(0, state.backgroundGradientStart);
        gradient.addColorStop(1, state.backgroundGradientEnd);
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = state.backgroundColor;
    }

    // Draw background shape
    ctx.beginPath();
    switch (state.backgroundShape) {
        case 'none':
        case 'rectangle':
            ctx.rect(0, 0, width, height);
            break;
        case 'circle':
            ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
            break;
        case 'triangle':
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(0, height);
            ctx.lineTo(width, height);
            break;
        case 'diamond':
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width, height / 2);
            ctx.lineTo(width / 2, height);
            ctx.lineTo(0, height / 2);
            break;
        case 'hexagon': {
            const radius = Math.min(width, height) / 2;
            for (let i = 0; i < 6; i++) {
                const angle = i * Math.PI / 3;
                const x = width / 2 + radius * Math.cos(angle);
                const y = height / 2 + radius * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            break;
        }
        case 'octagon': {
            const radius = Math.min(width, height) / 2;
            for (let i = 0; i < 8; i++) {
                const angle = i * Math.PI / 4;
                const x = width / 2 + radius * Math.cos(angle);
                const y = height / 2 + radius * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            break;
        }
        case 'star': {
            const outerRadius = Math.min(width, height) / 2;
            const innerRadius = outerRadius / 2;
            for (let i = 0; i < 10; i++) {
                const angle = i * Math.PI / 5;
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const x = width / 2 + radius * Math.cos(angle);
                const y = height / 2 + radius * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            break;
        }
    }
    ctx.closePath();
    ctx.fill();
}

function drawText() {
    const { width, height } = logoCanvas;

    // Set text fill style
    if (state.fontGradient === 'linear') {
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, state.fontGradientStart);
        gradient.addColorStop(1, state.fontGradientEnd);
        ctx.fillStyle = gradient;
    } else if (state.fontGradient === 'radial') {
        const gradient = ctx.createRadialGradient(
            width / 2, height / 2, 0,
            width / 2, height / 2, Math.min(width, height) / 2
        );
        gradient.addColorStop(0, state.fontGradientStart);
        gradient.addColorStop(1, state.fontGradientEnd);
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = state.textColor;
    }

    // Draw text
    ctx.font = `${state.fontSize}px ${state.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(state.text, width / 2, height / 2);
}

function updateLogoPreview() {
    ctx.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
    drawBackground();
    drawText();
}

// Event handlers
function handleInputChange(event) {
    const { id, value } = event.target;
    const key = id.replace(/-./g, x => x[1].toUpperCase());
    state[key] = value;
    updateLogoPreview();

    // Toggle gradient controls visibility
    if (id === 'font-gradient') {
        document.getElementById('font-gradient-controls').classList.toggle('active', value !== 'none');
    }
    if (id === 'background-gradient') {
        document.getElementById('background-gradient-controls').classList.toggle('active', value !== 'none');
    }
}

function generateRandomLogo() {
    state.text = Math.random().toString(36).substring(2, 7).toUpperCase();
    state.fontFamily = getRandomItem(['Arial', 'Times New Roman', 'Courier New']);
    state.textColor = getRandomColor();
    state.fontGradient = getRandomItem(['none', 'linear', 'radial']);
    state.fontGradientStart = getRandomColor();
    state.fontGradientEnd = getRandomColor();
    state.backgroundColor = getRandomColor();
    state.backgroundShape = getRandomItem(['none', 'rectangle', 'circle', 'triangle', 'diamond', 'hexagon', 'octagon', 'star']);
    state.backgroundGradient = getRandomItem(['none', 'linear', 'radial']);
    state.backgroundGradientStart = getRandomColor();
    state.backgroundGradientEnd = getRandomColor();
    state.fontSize = Math.floor(Math.random() * 48) + 24;

    // Update form inputs
    Object.entries(state).forEach(([key, value]) => {
        const id = key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    });

    // Update gradient controls visibility
    document.getElementById('font-gradient-controls').classList.toggle('active', state.fontGradient !== 'none');
    document.getElementById('background-gradient-controls').classList.toggle('active', state.backgroundGradient !== 'none');

    updateLogoPreview();
}

function saveLogo() {
    logoCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'logo.png';
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}

// Add event listeners
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', handleInputChange);
});

document.getElementById('random-logo').addEventListener('click', generateRandomLogo);
document.getElementById('generate-logo').addEventListener('click', updateLogoPreview);
document.getElementById('save-logo').addEventListener('click', saveLogo);

// Initialize
document.getElementById('font-gradient-controls').classList.toggle('active', state.fontGradient !== 'none');
document.getElementById('background-gradient-controls').classList.toggle('active', state.backgroundGradient !== 'none');
updateLogoPreview();