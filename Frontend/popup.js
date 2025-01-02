// Get DOM elements
const statusElement = document.getElementById('status');
const currentUrlElement = document.getElementById('current-url');
const threatScoreElement = document.getElementById('threat-score');

// Function to update the popup UI
function updateUI(url, isSecure, score) {
    // Update URL display
    currentUrlElement.textContent = url;
    
    // Update threat score
    threatScoreElement.textContent = score ? `${(score * 100).toFixed(2)}%` : 'N/A';
    
    // Update status message and styling
    statusElement.className = 'status ' + (isSecure ? 'safe' : 'danger');
    statusElement.textContent = isSecure ? 'This website appears to be safe' : 'Warning: Potential security threat detected';
}

// When popup is opened, get current tab info
chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    // Show loading state
    statusElement.className = 'status loading';
    statusElement.textContent = 'Analyzing...';
    currentUrlElement.textContent = url;
    
    try {
        // Request analysis from background script
        chrome.runtime.sendMessage(
            { action: 'analyzeURL', url: url },
            response => {
                if (response && response.prediction !== undefined) {
                    updateUI(url, response.prediction < 0.5, response.prediction);
                } else {
                    statusElement.textContent = 'Error analyzing URL';
                    statusElement.className = 'status';
                }
            }
        );
    } catch (error) {
        console.error('Error:', error);
        statusElement.textContent = 'Error analyzing URL';
        statusElement.className = 'status';
    }
});