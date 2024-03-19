const delay = ms => new Promise(res => setTimeout(res, ms));

if (window.location.hostname.includes('nike.com')) {
    console.log('started');
    getNikeProductDetails();
} else {
    console.log('URL is not a Nike URL. Skipping product details fetching.');
}

async function getNikeProductDetails() {
  await delay(6000);
  // Find the style element with text content starting with "Style #:"
  const styleElement = document.querySelector('.mb-1-sm');
  const sizeElement = document.querySelector('[data-attr="itemSize"]');
  var styleText;
  var sizeText;
  
  if (styleElement.textContent.startsWith('Style #:') && sizeElement.textContent.startsWith('Size: ')) {
      styleText = styleElement.textContent.replace('Style #: ', '').trim();
      sizeText = sizeElement.textContent.replace('Size: ', '').trim();
      console.log("STYLE TEXT AND SIZE: " + styleText + "  " + sizeText)
  }
  else {
      console.log('Elements not found or do not match the criteria.');
  }
  
  let clickCount = 0;
  
  function handleClick() {
      clickCount++;
      console.log(`Clicked ${clickCount} times`)
      if (clickCount === 3) {                     /// TO CHANGE WHEN FINISHED DEVELOPMENT TO 4
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
      }, 6000);
  }
  
  const button = document.querySelector('.nds-btn.css-b4ij8a.ex41m6f0.btn-primary-dark.btn-md');
  if (button) {
      button.addEventListener('click', handleButtonClick);
      console.log("event clicker");
  }
  else{
    console.log("button not found");
  }
}

function uploadToServer(styleText, sizeText) {
    const extensionId = chrome.runtime.id || browser.runtime.id;
    console.log("extensionID is: " + extensionId);
    // Send a POST request to the server with the style, size, and extension ID
    fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            style: style,
            size: size,
            extensionId: extensionId
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Data uploaded to server');
        } else {
            console.error('Error uploading data to server');
        }
    })
    .catch(error => {
        console.error('Error uploading data to server:', error);
    });
}
