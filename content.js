function getNikeProductDetails() {

  // Find the style element with text content starting with "Style #:"
  const styleElement = document.querySelector('.mb-1-sm');
  const sizeElement = document.querySelector('[data-attr="itemSize"]');
  const styleText = styleElement.textContent;
  const sizeText = sizeElement.textContent;
  
  if (styleText.startsWith('Style #:') && sizeText.startsWith('Size: ')) {
      const styleText = styleText.replace('Style #: ', '').trim();
      const sizeText = sizeText.replace('Size: ', '').trim();
  }
  else {
      console.log('Elements not found or do not match the criteria.');
  }
  
  let clickCount = 0;
  
  function handleClick() {
      clickCount++;
      if (clickCount === 4) {
          uploadToServer(styleText, sizeText);
          clickCount = 0;
      }
  }
  
  function handleButtonClick() {
      handleClick();
  
      setTimeout(() => {
          const button = document.querySelector('.nds-btn.css-b4ij8a.ex41m6f0.btn-primary-dark.btn-md');
          if (button) {
              button.addEventListener('click', handleButtonClick);
          }
      }, 3000);
  }
  
  const button = document.querySelector('.nds-btn.css-b4ij8a.ex41m6f0.btn-primary-dark.btn-md');
  if (button) {
      button.addEventListener('click', handleButtonClick);
  }
}

function uploadToServer(styleText, sizeText) {
    console.log('Data uploaded to server');
}
