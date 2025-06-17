import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Generate Viral Ads Like a $10K Creative Agency';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/20 
                      rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">
            AI-POWERED AD GENERATION
          </span>
        </div>

        {/* Main Heading with Typing Effect */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="text-yellow-400">Hand-Picked</span> Viral Ads
          <br />
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Transform your business description into viral ad copy, TikTok scripts, and Facebook ads 
          that convert - all in under 10 seconds.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
            <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Viral Headlines</h3>
            <p className="text-gray-400 text-sm">AI-crafted headlines that stop scrolling and drive clicks</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
            <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">TikTok Scripts</h3>
            <p className="text-gray-400 text-sm">Ready-to-use video scripts optimized for viral content</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">Ad Previews</h3>
            <p className="text-gray-400 text-sm">Visual ad mockups ready for Facebook and Instagram</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;