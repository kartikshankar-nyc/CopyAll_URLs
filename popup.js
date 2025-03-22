document.addEventListener('DOMContentLoaded', function() {
  const copyButton = document.getElementById('copyButton');
  const statusDiv = document.getElementById('status');
  
  copyButton.addEventListener('click', function() {
    // Query for all tabs in the current window
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
      // Extract URLs from all tabs
      const urls = tabs.map(tab => tab.url);
      
      // Join URLs with newlines
      const urlText = urls.join('\n');
      
      // Copy to clipboard
      navigator.clipboard.writeText(urlText).then(function() {
        // Show success message
        statusDiv.textContent = 'URLs copied to clipboard!';
        statusDiv.style.display = 'block';
        
        // Hide the message after 3 seconds
        setTimeout(function() {
          statusDiv.style.display = 'none';
        }, 3000);
      }).catch(function(err) {
        // Show error message if copying fails
        statusDiv.textContent = 'Failed to copy: ' + err;
        statusDiv.style.color = '#db4437';
        statusDiv.style.display = 'block';
      });
    });
  });
});