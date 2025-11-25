// Cannon Ball XPBD Example
import { Demo } from '../../src/index';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Test XPBD import
const demo = new Demo();

function resizeCanvas(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function render(): void {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Example placeholder - draw a simple box
    ctx.fillStyle = '#fff';
    ctx.fillRect(canvas.width / 2 - 25, canvas.height / 2 - 25, 50, 50);
    
    requestAnimationFrame(render);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
render();