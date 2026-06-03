const particleLayers = document.querySelectorAll('.parallax-layer.particle-layer');

function createParticlesForLayer(layerEl, count = 60, sizeMin = 2, sizeMax = 6) {
  layerEl.innerHTML = '';
  const isLayer5 = layerEl.classList.contains('layer5');
  const ampMax = isLayer5 ? 20 : 10;
  const speedBase = isLayer5 ? 3 : 2;
  const speedRange = isLayer5 ? 6 : 4;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * (sizeMax - sizeMin) + sizeMin;
    p.style.width = p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;

    const minOp = 0.05;
    const maxOp = 0.8;
    p.style.opacity = (Math.random() * (maxOp - minOp) + minOp).toFixed(2);

    const duration = (speedBase + Math.random() * speedRange).toFixed(2);
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${-Math.random() * duration}s`;

    const amp = -(Math.random() * (ampMax - 4) + 4);
    p.style.setProperty('--amp', `${amp}px`);

    const blur = (Math.random() * 1.4 + 0.05).toFixed(2);
    p.style.filter = `blur(${blur}px)`;

    layerEl.appendChild(p);
  }
}

window.createParticlesForLayer = createParticlesForLayer;

if (particleLayers.length > 0) {
  particleLayers.forEach(pl => {
    if (pl.classList.contains('layer5')) createParticlesForLayer(pl, 130, 2, 8);
    else if (pl.classList.contains('layer6')) createParticlesForLayer(pl, 55, 1.2, 4);
  });
}
