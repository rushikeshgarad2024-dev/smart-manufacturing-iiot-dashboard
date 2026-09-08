const canvas = document.getElementById('telemetryCanvas');
const ctx = canvas.getContext('2d');

let dataPoints = Array.from({ length: 120 }, (_, i) => Math.sin(i * 0.15) * 20 + 40);

function updateTelemetry() {
  const nextVal = (Math.sin(Date.now() * 0.005) * 15 + Math.random() * 8) + 40;
  dataPoints.shift();
  dataPoints.push(nextVal);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Grid
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y < canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }

  // Draw Line
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  const step = canvas.width / (dataPoints.length - 1);
  dataPoints.forEach((val, idx) => {
    const x = idx * step;
    const y = canvas.height - (val * 3);
    if (idx === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw Glow area
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
  ctx.fill();

  requestAnimationFrame(updateTelemetry);
}

updateTelemetry();
