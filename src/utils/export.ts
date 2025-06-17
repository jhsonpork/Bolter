import { SavedCampaign } from '../types/ad';

export const exportToMetaAds = (campaigns: SavedCampaign[]) => {
  const headers = [
    'Campaign Name',
    'Ad Set Name', 
    'Ad Name',
    'Headline',
    'Primary Text',
    'Description',
    'Call to Action',
    'Website URL',
    'Image/Video',
    'Target Audience',
    'Budget',
    'Bid Strategy'
  ];

  const rows: string[][] = [headers];

  campaigns.forEach((campaign, campaignIndex) => {
    if (campaign.type === 'single' && campaign.ad) {
      rows.push([
        `${campaign.name}`,
        `${campaign.name} - Ad Set 1`,
        `${campaign.name} - Ad 1`,
        campaign.ad.headline,
        campaign.ad.adCopy,
        campaign.ad.adCopy.substring(0, 90) + '...',
        'Learn More',
        'https://your-website.com',
        'Upload your image/video',
        campaign.ad.businessType,
        '$50/day',
        'Lowest Cost'
      ]);
    } else if (campaign.type === 'campaign' && campaign.campaign) {
      campaign.campaign.forEach((day, dayIndex) => {
        rows.push([
          `${campaign.name}`,
          `${campaign.name} - Day ${day.day}`,
          `${campaign.name} - Day ${day.day} Ad`,
          day.headline,
          day.adCopy,
          day.adCopy.substring(0, 90) + '...',
          'Learn More',
          'https://your-website.com',
          'Upload your image/video',
          day.theme,
          '$50/day',
          'Lowest Cost'
        ]);
      });
    }
  });

  downloadCSV(rows, `meta-ads-export-${Date.now()}.csv`);
};

export const exportToGoogleAds = (campaigns: SavedCampaign[]) => {
  const headers = [
    'Campaign',
    'Ad Group',
    'Headline 1',
    'Headline 2', 
    'Headline 3',
    'Description 1',
    'Description 2',
    'Final URL',
    'Path 1',
    'Path 2',
    'Keywords',
    'Match Type',
    'Max CPC'
  ];

  const rows: string[][] = [headers];

  campaigns.forEach((campaign) => {
    if (campaign.type === 'single' && campaign.ad) {
      const headlines = campaign.ad.headline.split(' ');
      rows.push([
        campaign.name,
        `${campaign.name} - Ad Group 1`,
        headlines.slice(0, 5).join(' '),
        headlines.slice(5, 10).join(' ') || campaign.ad.headline,
        campaign.ad.businessType,
        campaign.ad.adCopy.substring(0, 90),
        campaign.ad.adCopy.substring(90, 180) || campaign.ad.adCopy.substring(0, 90),
        'https://your-website.com',
        'products',
        'services',
        campaign.ad.businessType.toLowerCase().replace(/\s+/g, ' '),
        'Broad',
        '$2.00'
      ]);
    } else if (campaign.type === 'campaign' && campaign.campaign) {
      campaign.campaign.forEach((day) => {
        const headlines = day.headline.split(' ');
        rows.push([
          campaign.name,
          `${campaign.name} - Day ${day.day}`,
          headlines.slice(0, 5).join(' '),
          headlines.slice(5, 10).join(' ') || day.headline,
          day.theme,
          day.adCopy.substring(0, 90),
          day.adCopy.substring(90, 180) || day.adCopy.substring(0, 90),
          'https://your-website.com',
          'products',
          'services',
          day.theme.toLowerCase().replace(/\s+/g, ' '),
          'Broad',
          '$2.00'
        ]);
      });
    }
  });

  downloadCSV(rows, `google-ads-export-${Date.now()}.csv`);
};

export const exportToCSV = (campaigns: SavedCampaign[]) => {
  const headers = [
    'Campaign Name',
    'Type',
    'Created Date',
    'Headline',
    'Ad Copy',
    'TikTok Script',
    'Captions',
    'Business Type',
    'Tone'
  ];

  const rows: string[][] = [headers];

  campaigns.forEach((campaign) => {
    if (campaign.type === 'single' && campaign.ad) {
      rows.push([
        campaign.name,
        'Single Ad',
        new Date(campaign.createdAt).toLocaleDateString(),
        campaign.ad.headline,
        campaign.ad.adCopy,
        campaign.ad.tiktokScript,
        campaign.ad.captions.join(' | '),
        campaign.ad.businessType,
        campaign.ad.tone || 'Professional'
      ]);
    } else if (campaign.type === 'campaign' && campaign.campaign) {
      campaign.campaign.forEach((day) => {
        rows.push([
          `${campaign.name} - Day ${day.day}`,
          '7-Day Campaign',
          new Date(campaign.createdAt).toLocaleDateString(),
          day.headline,
          day.adCopy,
          day.tiktokScript,
          day.captions.join(' | '),
          day.theme,
          'Professional'
        ]);
      });
    }
  });

  downloadCSV(rows, `campaigns-export-${Date.now()}.csv`);
};

const downloadCSV = (rows: string[][], filename: string) => {
  const csvContent = rows.map(row => 
    row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};