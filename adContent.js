  // Define selectors that commonly match ads
  const adSelectors = [
    'iframe[src*="ads"]', 
    'div[id*="ad"]', 
    'div[class*="ad"]', 
    'div[class*="sponsored"]',
    'img[class="img_ad"]',
    'a[href*="googleads"]',
    'div[data-ad-placeholder]'
  ];

// Replace matched ads with custom content
async function replaceAds() {
    adSelectors.forEach(selector => {
      const adElements = document.querySelectorAll(selector);
      adElements.forEach(async adElement => {
        if(!adElement.classList.contains("hidden") && (parseInt(adElement.style.width) > 0  || parseInt(adElement.style.height) > 0)){
          if(parseInt(adElement.style.width) > 0){
            var name = "images/ads/"+Math.floor(Math.random() * 9) + "w" + parseInt(adElement.style.width)+".png";
          }
          console.log("width " + adElement.style.width);
          console.log("height " + adElement.style.height);
          const replacement = document.createElement('img');
          try{
            replacement.src = await chrome.runtime.getURL(name);
            adElement.style.display = 'none'; // Hide the ad
            adElement.classList.add("hidden");
          }catch{
          }
          adElement.parentNode.insertBefore(replacement, adElement);
        }
      });
    });
  }

  // Function to replace ad images
function replaceAdImages() {
    // Find all images on the page
    const images = document.querySelectorAll('img');
  
    // Iterate through all images and replace those identified as ads
    images.forEach(image => {
      // Simple heuristic to identify ad images (you can improve this)
      if (image.src.includes('ad') || image.classList.contains('ad') || image.id.includes('ad')) {
        // Replace the ad image with your custom ad
        //image.src = newAdImageUrl;
        console.log(`Ad image replaced:` + image.style + " height " + image.style.height);
      }
    });
  }
  
setInterval(replaceAds, 1000);
