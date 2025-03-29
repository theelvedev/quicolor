function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getOppositeColor(hexColor) {
  hexColor = hexColor.replace('#', '');
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const invR = 255 - r;
  const invG = 255 - g;
  const invB = 255 - b;
  const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(invR)}${toHex(invG)}${toHex(invB)}`;
}

function setRandomColor() {
  const newColor = getRandomColor();
  document.body.style.backgroundColor = newColor;
  const textColor = getOppositeColor(newColor);
  document.body.style.color = textColor;
  document.documentElement.style.setProperty('--bg-color', newColor);
  document.documentElement.style.setProperty('--opposite-color', textColor);
  currentColor = newColor;
}

async function copyHexToClipboard() {
  try {
      await navigator.clipboard.writeText(currentColor);
      alert('Copied to clipboard: ' + currentColor);
  } catch (err) {
      console.error('Failed to copy: ', err);
      const textarea = document.createElement('textarea');
      textarea.value = currentColor;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Copied to clipboard: ' + currentColor);
  }
}

let currentColor;

document.addEventListener('DOMContentLoaded', () => {
  setRandomColor();
  document.getElementById('changeColor').addEventListener('click', setRandomColor);
  document.getElementById('copyHex').addEventListener('click', copyHexToClipboard);
});
