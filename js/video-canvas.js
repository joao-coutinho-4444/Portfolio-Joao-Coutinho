const setupProjectVideoCanvas = () => {
  const video = document.querySelector('.frame-controller-3d-modeling .project-frame-content-video-source');
  const canvas = document.querySelector('.frame-controller-3d-modeling .project-frame-content-video');

  if (!video || !canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  const drawFrame = () => {
    const { clientWidth, clientHeight } = canvas;
    if (!clientWidth || !clientHeight || !video.videoWidth || !video.videoHeight) {
      requestAnimationFrame(drawFrame);
      return;
    }

    if (canvas.width !== clientWidth * devicePixelRatio || canvas.height !== clientHeight * devicePixelRatio) {
      canvas.width = Math.round(clientWidth * devicePixelRatio);
      canvas.height = Math.round(clientHeight * devicePixelRatio);
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / video.videoWidth, ch / video.videoHeight);
    const drawWidth = video.videoWidth * scale;
    const drawHeight = video.videoHeight * scale;
    const offsetX = (cw - drawWidth) / 2;
    const offsetY = (ch - drawHeight) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
    requestAnimationFrame(drawFrame);
  };

  const start = async () => {
    try {
      await video.play();
    } catch {
      // Autoplay may still be blocked until the browser allows it.
    }
    requestAnimationFrame(drawFrame);
  };

  if (video.readyState >= 2) {
    start();
  } else {
    video.addEventListener('loadeddata', start, { once: true });
  }
};

setupProjectVideoCanvas();
