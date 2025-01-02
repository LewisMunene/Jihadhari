// Function to extract features from the current page
function extractPageFeatures() {
    const features = {
        url: window.location.href,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        pathLength: window.location.pathname.length,
        queryParams: window.location.search,
        numQueryParams: window.location.search.split('&').length - 1,
        hasHTTPS: window.location.protocol === 'https:',
        domainLength: window.location.hostname.length,
        numDots: window.location.hostname.split('.').length - 1,
        hasIPAddress: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(window.location.hostname),
        hasSuspiciousTLD: checkSuspiciousTLD(window.location.hostname),
        hasRedirects: document.querySelectorAll('meta[http-equiv="refresh"]').length > 0,
        numExternalLinks: countExternalLinks(),
        numIframes: document.getElementsByTagName('iframe').length
    };
    
    return features;
}

// Function to check for suspicious TLDs
function checkSuspiciousTLD(hostname) {
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.xyz'];
    return suspiciousTLDs.some(tld => hostname.endsWith(tld));
}

// Function to count external links
function countExternalLinks() {
    const currentDomain = window.location.hostname;
    const links = document.getElementsByTagName('a');
    let externalCount = 0;

    for (let link of links) {
        try {
            const url = new URL(link.href);
            if (url.hostname !== currentDomain) {
                externalCount++;
            }
        } catch (e) {
            // Invalid URL, skip
            continue;
        }
    }
    
    return externalCount;
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPageFeatures') {
        const features = extractPageFeatures();
        sendResponse({ features: features });
    }
    return true; // Required for async response
});

// Initialize feature extraction when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Send initial features to background script
    chrome.runtime.sendMessage({
        action: 'analyzePage',
        features: extractPageFeatures()
    });
});

// Monitor for dynamic content changes
const observer = new MutationObserver(() => {
    chrome.runtime.sendMessage({
        action: 'analyzePage',
        features: extractPageFeatures()
    });
});

// Start observing document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});