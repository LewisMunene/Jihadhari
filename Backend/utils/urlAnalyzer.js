// Backend/utils/urlAnalyzer.js

const analyzeUrl = (url) => {
    const features = extractFeatures(url);
    return calculateRisk(features);
};

const extractFeatures = (url) => {
    return {
        length: url.length,
        hasHttps: url.toLowerCase().startsWith('https://'),
        domain: extractDomain(url),
        patterns: detectSuspiciousPatterns(url),
        hasLoginForm: url.toLowerCase().includes('login'),
        isIPAddress: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(extractDomain(url))
    };
};

const extractDomain = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch {
        return url.replace(/^https?:\/\//, '').split('/')[0];
    }
};

const detectSuspiciousPatterns = (url) => {
    const lowercaseUrl = url.toLowerCase();
    const patterns = [
        { regex: /\.(tk|ml|ga|cf|gq)$/i, weight: 20, name: 'SUSPICIOUS_TLD' },
        { regex: /@/g, weight: 15, name: 'CONTAINS_AT_SYMBOL' },
        { regex: /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/, weight: 25, name: 'IP_URL' },
        { regex: /(paypal|login|signin|bank|account|security|verify).*\.(com|net|org)/i, weight: 15, name: 'PHISHING_KEYWORDS' },
        { regex: /\.(exe|php|bat|scr)$/i, weight: 20, name: 'SUSPICIOUS_EXTENSION' },
        { regex: /[^a-zA-Z0-9-.]/, weight: 10, name: 'SPECIAL_CHARS' }
    ];

    return patterns.filter(pattern => pattern.regex.test(lowercaseUrl));
};

const calculateRisk = (features) => {
    let score = 0;
    let riskFactors = [];

    // Base score from URL length
    if (features.length > 100) {
        score += 10;
        riskFactors.push('EXCESSIVE_LENGTH');
    }

    // HTTPS check
    if (!features.hasHttps) {
        score += 15;
        riskFactors.push('NO_HTTPS');
    }

    // IP Address check
    if (features.isIPAddress) {
        score += 25;
        riskFactors.push('IP_ADDRESS_URL');
    }

    // Login form in unsecure context
    if (features.hasLoginForm && !features.hasHttps) {
        score += 20;
        riskFactors.push('UNSECURE_LOGIN');
    }

    // Add scores from suspicious patterns
    features.patterns.forEach(pattern => {
        score += pattern.weight;
        riskFactors.push(pattern.name);
    });

    // Normalize score to 0-100
    score = Math.min(Math.max(score, 0), 100);

    // Determine status and risk level
    let status, riskLevel;
    if (score < 30) {
        status = 'Safe';
        riskLevel = 'Low Risk';
    } else if (score < 60) {
        status = 'Warning';
        riskLevel = 'Medium Risk';
    } else {
        status = 'Malicious';
        riskLevel = 'High Risk';
    }

    return {
        score,
        status,
        riskLevel,
        riskFactors
    };
};

module.exports = {
    analyzeUrl
};