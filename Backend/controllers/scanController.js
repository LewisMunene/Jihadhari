// Backend/controllers/scanController.js
const Scan = require('../models/scanModel');
const { analyzeUrl } = require('../utils/urlAnalyzer');

exports.scanUrl = async (req, res) => {
    try {
        const { url } = req.body;
        console.log('Received scan request for URL:', url);

        if (!url) {
            return res.status(400).json({
                status: 'error',
                message: 'URL is required'
            });
        }

        // Analyze URL
        const analysis = analyzeUrl(url);
        console.log('URL analysis result:', analysis);

        // Create scan record
        const scan = await Scan.create({
            url,
            status: analysis.status,
            riskScore: analysis.score,
            riskLevel: analysis.riskLevel,
            riskFactors: analysis.riskFactors,
            user: req.user.id
        });

        console.log('Scan record created:', scan);

        return res.status(200).json({
            status: 'success',
            data: {
                scan: {
                    url: scan.url,
                    status: scan.status,
                    riskScore: scan.riskScore,
                    riskLevel: scan.riskLevel,
                    createdAt: scan.createdAt
                }
            }
        });

    } catch (error) {
        console.error('Scan error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error scanning URL',
            debug: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getScans = async (req, res) => {
    try {
        // Get recent scans
        const scans = await Scan.find({ user: req.user.id })
            .select('url status riskScore riskLevel createdAt')
            .sort('-createdAt')
            .limit(10);

        // Calculate stats
        const stats = await Scan.aggregate([
            { $match: { user: req.user.id } },
            { 
                $group: {
                    _id: null,
                    totalScans: { $sum: 1 },
                    threatsDetected: { 
                        $sum: { 
                            $cond: [{ $eq: ["$status", "Malicious"] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const scanStats = stats[0] || { totalScans: 0, threatsDetected: 0 };
        const detectionRate = scanStats.totalScans ? 
            Math.round((scanStats.threatsDetected / scanStats.totalScans) * 100) : 0;

        return res.status(200).json({
            status: 'success',
            data: {
                scans,
                stats: {
                    totalScans: scanStats.totalScans,
                    threatsDetected: scanStats.threatsDetected,
                    detectionRate
                }
            }
        });

    } catch (error) {
        console.error('Get scans error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Error fetching scan history'
        });
    }
};