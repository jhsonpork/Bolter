import React from 'react';
import { Calendar, Zap, Trash2, Download, Copy, Eye } from 'lucide-react';
import { SavedCampaign } from '../types/ad';
import { downloadAdPackage, downloadCampaignPackage } from '../utils/download';

interface SavedCampaignsProps {
  campaigns: SavedCampaign[];
  onDeleteCampaign: (id: string) => void;
}

const SavedCampaigns: React.FC<SavedCampaignsProps> = ({ campaigns, onDeleteCampaign }) => {
  const [expandedCampaign, setExpandedCampaign] = React.useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = (campaign: SavedCampaign) => {
    if (campaign.type === 'single' && campaign.ad) {
      downloadAdPackage(campaign.ad);
    } else if (campaign.type === 'campaign' && campaign.campaign) {
      downloadCampaignPackage(campaign.campaign);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (campaigns.length === 0) {
    return (
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Saved Campaigns</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-12">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No campaigns saved yet</p>
            <p className="text-gray-500 text-sm mt-2">Generate your first ad or campaign to see it here</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Saved Campaigns ({campaigns.length})
        </h2>

        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {campaign.type === 'single' ? (
                    <Zap className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Calendar className="w-6 h-6 text-yellow-400" />
                  )}
                  <div>
                    <h3 className="text-white font-bold text-lg">{campaign.name}</h3>
                    <p className="text-gray-400 text-sm">{formatDate(campaign.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setExpandedCampaign(expandedCampaign === campaign.id ? null : campaign.id)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDownload(campaign)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteCampaign(campaign.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Campaign Preview */}
              <div className="mb-4">
                {campaign.type === 'single' && campaign.ad && (
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h4 className="text-yellow-400 font-semibold mb-2">{campaign.ad.headline}</h4>
                    <p className="text-gray-300 text-sm line-clamp-2">{campaign.ad.adCopy}</p>
                  </div>
                )}
                
                {campaign.type === 'campaign' && campaign.campaign && (
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      7-day campaign with {campaign.campaign.length} unique ad concepts
                    </p>
                  </div>
                )}
              </div>

              {/* Expanded Details */}
              {expandedCampaign === campaign.id && (
                <div className="border-t border-gray-700 pt-4 space-y-4 animate-fade-in">
                  {campaign.type === 'single' && campaign.ad && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-white font-semibold">Ad Copy</h5>
                          <button
                            onClick={() => handleCopy(campaign.ad!.adCopy)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm bg-gray-900/30 rounded p-3">{campaign.ad.adCopy}</p>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-white font-semibold">TikTok Script</h5>
                          <button
                            onClick={() => handleCopy(campaign.ad!.tiktokScript)}
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-300 text-sm bg-gray-900/30 rounded p-3 whitespace-pre-line">{campaign.ad.tiktokScript}</p>
                      </div>
                    </div>
                  )}
                  
                  {campaign.type === 'campaign' && campaign.campaign && (
                    <div className="space-y-3">
                      {campaign.campaign.slice(0, 3).map((day, index) => (
                        <div key={index} className="bg-gray-900/30 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-semibold">Day {day.day}: {day.theme}</h5>
                            <button
                              onClick={() => handleCopy(`Day ${day.day}: ${day.theme}\n${day.headline}\n${day.adCopy}`)}
                              className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-yellow-400 text-sm font-medium mb-1">{day.headline}</p>
                          <p className="text-gray-300 text-sm">{day.adCopy}</p>
                        </div>
                      ))}
                      {campaign.campaign.length > 3 && (
                        <p className="text-gray-400 text-sm text-center">
                          +{campaign.campaign.length - 3} more days in campaign
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SavedCampaigns;