// EmbedPowerBI.js
import React, { useEffect, useRef } from 'react';
import { models, factories } from 'powerbi-client';

const EmbedPowerBI = () => {
    const reportContainerRef = useRef(null);

    useEffect(() => {
        const fetchEmbedToken = async () => {
            const response = await fetch('http://localhost:3000/api/get-embed-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            return data.embedToken;
        };

        const loadReport = async () => {
            const embedToken = await fetchEmbedToken();

            const config = {
                type: 'report',
                tokenType: models.TokenType.Embed,
                accessToken: embedToken,
                embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${YOUR_REPORT_ID}&groupId=${YOUR_WORKSPACE_ID}`,
                settings: {
                    panes: {
                        filters: { visible: false },
                        pageNavigation: { visible: true }
                    }
                }
            };

            const powerbi = factories.createReportEmbed(reportContainerRef.current);
            powerbi.embed(config);
        };

        loadReport();
    }, []);

    return (
        <div>
            <h1>Embedded Power BI Report</h1>
            <div ref={reportContainerRef} style={{ height: '600px', width: '100%' }}></div>
        </div>
    );
};

export default EmbedPowerBI;
