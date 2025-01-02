// Import TensorFlow.js
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js');

// Global variables
let model = null;

// Initialize the model
async function loadModel() {
    try {
        model = await tf.loadLayersModel('tfjs_model/model.json');
        console.log('Model loaded successfully');
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

// Feature extraction function
async function extractFeatures(url) {
    // TODO: Implement feature extraction similar to training phase
    // This will need to match the preprocessing done during training
    return [];
}

// URL prediction function
async function predictURL(url) {
    if (!model) {
        await loadModel();
    }

    try {
        const features = await extractFeatures(url);
        const prediction = await model.predict(features);
        return prediction;
    } catch (error) {
        console.error('Prediction error:', error);
        return null;
    }
}

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    if (details.frameId === 0) {  // Main frame only
        const prediction = await predictURL(details.url);
        if (prediction > 0.5) {  // Threshold for malicious URLs
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: 'Security Alert',
                message: 'Warning: Potentially malicious website detected!'
            });
        }
    }
});

// Initialize
loadModel();