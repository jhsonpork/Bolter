import React, { useState } from 'react';
import { Download, FileText, Image, Code, Lock } from 'lucide-react';
import { SavedCampaign } from '../types/ad';
import { exportToMetaAds, exportToGoogleAds, exportToCSV } from '../utils/export';

interface CampaignExporterProps {
  campaigns: SavedCampaign[];
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const CampaignExporter: React.FC<CampaignExporterProps> = ({ campaigns, onUpgradeClick, hasUsedFreeTrial }) => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState('meta');

  const exportFormats = [
    { id: 'meta', label: 'Meta Ads Manager', emoji: '📘', description: 'Facebook & Instagram ads format' },
    { id: 'google', label: 'Google Ads', emoji: '🔍', description: 'Google Ads campaign format' },
    { id: 'csv', label: 'CSV Export', emoji: '📊', description: 'Spreadsheet format for any platform' },
    { id: 'json', label: 'JSON Export', emoji: '💾', description: 'Raw data format for developers' },
  ];

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleSelectAll = () => {
    setSelectedCampaigns(
      selectedCampaigns.length === campaigns.length 
        ? [] 
        : campaigns.map(c => c.id)
    );
  };

  const handleExport = () => {
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    const selectedCampaignData = campaigns.filter(c => selectedCampaigns.includes(c.id));
    
    switch (exportFormat) {
      case 'meta':
        exportToMetaAds(selectedCampaignData);
        break;
      case 'google':
        exportToGoogleAds(selectedCampaignData);
        break;
      case 'csv':
        exportToCSV(selectedCampaignData);
        break;
      case 'json':
        const jsonData = JSON.stringify(selectedCampaignData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `campaigns-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        break;
    }
  };

  if (campaigns.length === 0) {
    return (
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Campaign Export</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-12">
            <Download className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No campaigns to export</p>
            <p className="text-gray-500 text-sm mt-2">Generate some campaigns first to export them</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Campaign Export Center
          </h2>
          <p className="text-gray-400">
            Export your campaigns to Meta Ads Manager, Google Ads, or other formats
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaign Selection */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-yellow-400 font-bold text-lg">Select Campaigns</h3>
                <button
                  onClick={handleSelectAll}
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                >
                  {selectedCampaigns.length === campaigns.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      selectedCampaigns.includes(campaign.id)
                        ? 'border-yellow-400 bg-yellow-400/10'
                        : 'border-gray-600 bg-gray-900/50 hover:border-gray-500'
                    }`}
                    onClick={() => handleCampaignSelect(campaign.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedCampaigns.includes(campaign.id)
                          ? 'border-yellow-400 bg-yellow-400'
                          : 'border-gray-500'
                      }`}>
                        {selectedCampaigns.includes(campaign.id) && (
                          <div className="w-2 h-2 bg-black rounded-sm"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{campaign.name}</h4>
                        <p className="text-gray-400 text-sm">
                          {new Date(campaign.createdAt).toLocaleDateString()} • 
                          {campaign.type === 'single' ? ' Single Ad' : ' 7-Day Campaign'}
                        </p>
                        {campaign.type === 'single' && campaign.ad && (
                          <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                            {campaign.ad.headline}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">Export Format</h3>
              
              <div className="space-y-3">
                {exportFormats.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setExportFormat(format.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                      exportFormat === format.id
                        ? 'bg-yellow-400 text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{format.emoji}</span>
                      <div>
                        <div className="font-semibold">{format.label}</div>
                        <div className={`text-sm ${exportFormat === format.id ? 'text-black/70' : 'text-gray-400'}`}>
                          {format.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">Export Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Selected Campaigns</span>
                  <span className="text-white font-semibold">{selectedCampaigns.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Export Format</span>
                  <span className="text-white font-semibold">
                    {exportFormats.find(f => f.id === exportFormat)?.label}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Ads</span>
                  <span className="text-white font-semibold">
                    {campaigns
                      .filter(c => selectedCampaigns.includes(c.id))
                      .reduce((total, c) => total + (c.type === 'single' ? 1 : c.campaign?.length || 0), 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleExport}
                disabled={selectedCampaigns.length === 0}
                className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unlock Export - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Export Campaigns</span>
                  </>
                )}
              </button>

              {!hasUsedFreeTrial && (
                <p className="text-center text-gray-400 text-xs mt-3">
                  ✨ Free trial • No credit card required
                </p>
              )}
            </div>

            {/* Export Preview */}
            {exportFormat === 'meta' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-3">Meta Ads Format Preview</h4>
                <div className="bg-gray-900/50 rounded-lg p-3 text-xs text-gray-400 font-mono">
                  Campaign Name, Ad Set Name, Ad Name, Headline, Primary Text, Description, Call to Action...
                </div>
              </div>
            )}

            {exportFormat === 'google' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-3">Google Ads Format Preview</h4>
                <div className="bg-gray-900/50 rounded-lg p-3 text-xs text-gray-400 font-mono">
                  Campaign, Ad Group, Headline 1, Headline 2, Description 1, Description 2, Final URL...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignExporter;