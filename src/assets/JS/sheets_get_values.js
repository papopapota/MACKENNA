function loadGapi() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load gapi'));
      document.head.appendChild(script);
    });
  }
  
  loadGapi()
    .then(() => {
      // Initialize gapi and use it here
    })
    .catch(error => {
      console.error(error);
    });

function getValues(spreadsheetId, range , callback) {
    try {
        gapi.client.spe
    } catch (error) {
        
    }
}