const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const preview = document.getElementById('preview');
const result = document.getElementById('result');

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Camera access denied:", err);
    alert("Please allow camera access to use this app.");
  });

// Capture image
document.getElementById('capture').addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL('image/png');
  preview.src = dataURL;
});

// Send to backend
document.getElementById('predict').addEventListener('click', () => {
  const imageData = canvas.toDataURL('image/png');

  fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: imageData })
  })
    .then(res => res.json())
    .then(data => {
      result.textContent = `Predicted Digit: ${data.digit}`;
    })
    .catch(err => {
      console.error('Prediction error:', err);
      result.textContent = 'Error predicting digit';
    });
});
