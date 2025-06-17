import React from 'react';
import { AdResult } from '../types/ad';
import { TrendingUp, Users, MousePointer } from 'lucide-react';

interface AdPreviewProps {
  ad: AdResult;
}

const AdPreview: React.FC<AdPreviewProps> = ({ ad }) => {
  return (
    <div className="space-y-6">
      {/* Facebook Ad Preview */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-yellow-400 font-bold text-lg mb-6">Live Ad Preview</h3>
        
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">AD</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Your Business</div>
                <div className="text-gray-500 text-xs">Sponsored</div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 text-lg mb-2">{ad.headline}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{ad.adCopy}</p>
            </div>
            
            {/* Mock Image Placeholder */}
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-600 font-medium">Your Product Image</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-3 rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Performance Estimates */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h4 className="text-yellow-400 font-bold text-lg mb-4">Performance Estimates</h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Engagement Rate</span>
            </div>
            <span className="text-green-400 font-semibold">
              {ad.performanceEstimate?.engagementRate || '8.5'}%
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <MousePointer className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Click-Through Rate</span>
            </div>
            <span className="text-green-400 font-semibold">
              {ad.performanceEstimate?.clickThroughRate || '3.2'}%
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">Conversion Rate</span>
            </div>
            <span className="text-green-400 font-semibold">
              {ad.performanceEstimate?.conversionRate || '1.8'}%
            </span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
          <p className="text-yellow-400 text-sm font-medium">
            💡 Tip: These estimates are based on industry averages for {ad.tone || 'professional'} tone ads in the {ad.businessType} sector.
          </p>
        </div>
      </div>

      {/* Ad Insights */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h4 className="text-yellow-400 font-bold text-lg mb-4">AI Insights</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-gray-300 text-sm">Strong emotional hook in headline</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-gray-300 text-sm">Clear value proposition in ad copy</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <p className="text-gray-300 text-sm">Optimized for {ad.tone || 'professional'} audience</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
            <p className="text-gray-300 text-sm">Consider A/B testing different caption variations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPreview;