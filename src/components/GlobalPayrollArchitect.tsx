import React, { useState } from 'react';
import { Globe, Loader2, Lock, Copy, Briefcase, DollarSign, FileText } from 'lucide-react';
import { architectGlobalPayroll } from '../services/businessFeatures';
import { GlobalPayrollResult } from '../types/businessFeatures';

interface GlobalPayrollArchitectProps {
  onUpgradeClick: () => void;
  hasUsedFreeTrial: boolean;
}

const GlobalPayrollArchitect: React.FC<GlobalPayrollArchitectProps> = ({ onUpgradeClick, hasUsedFreeTrial }) => {
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [payrollResult, setPayrollResult] = useState<GlobalPayrollResult | null>(null);

  const handleGenerate = async () => {
    if (!role.trim() || !country.trim()) return;
    
    if (hasUsedFreeTrial) {
      onUpgradeClick();
      return;
    }

    setIsGenerating(true);
    try {
      const result = await architectGlobalPayroll(role, country);
      setPayrollResult(result);
    } catch (error) {
      console.error('Error generating global payroll information:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const roleExamples = [
    "Senior Developer",
    "Marketing Manager",
    "Customer Support",
    "Sales Representative",
    "Product Manager"
  ];

  const countryExamples = [
    "Argentina",
    "Germany",
    "Singapore",
    "Canada",
    "United Kingdom"
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Global Payroll Architect™
          </h2>
          <p className="text-gray-400">
            Get comprehensive labor law guidance for international hiring
          </p>
        </div>

        {!payrollResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-white font-medium mb-2 block">Employee Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Senior Developer, Marketing Manager..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                  <div className="mt-2">
                    <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {roleExamples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setRole(example)}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-white font-medium mb-2 block">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g., Germany, Singapore, Canada..."
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white 
                             placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                  <div className="mt-2">
                    <p className="text-gray-400 text-xs mb-2">Quick examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {countryExamples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setCountry(example)}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !role.trim() || !country.trim()}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                         font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                         shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40 disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Payroll Guide...</span>
                  </>
                ) : hasUsedFreeTrial ? (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Unlock Payroll Architect - $9.99/mo</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-5 h-5" />
                    <span>Generate Labor Law Guide</span>
                  </>
                )}
              </button>
              
              {!hasUsedFreeTrial && (
                <p className="text-center text-gray-400 text-sm mt-3">
                  ✨ Free trial • No credit card required
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Role & Country */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-yellow-400 font-bold text-lg mb-4">📋 Hiring Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <h4 className="text-blue-400 font-semibold">Role</h4>
                  </div>
                  <p className="text-white">{payrollResult.role}</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="w-5 h-5 text-green-400" />
                    <h4 className="text-green-400 font-semibold">Country</h4>
                  </div>
                  <p className="text-white">{payrollResult.country}</p>
                </div>
              </div>
            </div>

            {/* Labor Laws */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h4 className="text-blue-400 font-bold text-lg mb-4">⚖️ Labor Laws</h4>
              
              {/* Mandatory Benefits */}
              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3">Mandatory Benefits</h5>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <ul className="space-y-2">
                    {payrollResult.laborLaws.mandatoryBenefits.map((benefit, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Tax Thresholds */}
              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3">Tax Thresholds</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-gray-400 bg-gray-900/50">
                      <tr>
                        <th className="px-4 py-3 rounded-tl-lg">Threshold</th>
                        <th className="px-4 py-3">Rate</th>
                        <th className="px-4 py-3 rounded-tr-lg">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payrollResult.laborLaws.taxThresholds.map((threshold, index) => (
                        <tr key={index} className="bg-gray-800/30 border-b border-gray-700/30">
                          <td className="px-4 py-3">{threshold.threshold}</td>
                          <td className="px-4 py-3 text-green-400">{threshold.rate}</td>
                          <td className="px-4 py-3">{threshold.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Employment Types */}
              <div>
                <h5 className="text-white font-semibold mb-3">Employment Types</h5>
                <div className="space-y-4">
                  {payrollResult.laborLaws.employmentTypes.map((type, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                      <h6 className="text-yellow-400 font-semibold mb-2">{type.type}</h6>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Pros:</p>
                          <ul className="space-y-1">
                            {type.pros.map((pro, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Cons:</p>
                          <ul className="space-y-1">
                            {type.cons.map((con, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Requirements:</p>
                          <ul className="space-y-1">
                            {type.requirements.map((req, i) => (
                              <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Breakdown & Compliance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <h4 className="text-green-400 font-bold text-lg">Cost Breakdown</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-gray-300">Salary Range</span>
                    <span className="text-white font-semibold">{payrollResult.costBreakdown.salary}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-gray-300">Benefits Cost</span>
                    <span className="text-white font-semibold">{payrollResult.costBreakdown.benefits}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-gray-300">Tax Burden</span>
                    <span className="text-white font-semibold">{payrollResult.costBreakdown.taxes}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-green-400 font-semibold">Total Cost</span>
                    <span className="text-green-400 font-bold">{payrollResult.costBreakdown.totalCost}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-yellow-400" />
                    <h4 className="text-yellow-400 font-bold text-lg">Compliance Checklist</h4>
                  </div>
                  <button
                    onClick={() => handleCopy(payrollResult.complianceChecklist.join('\n'))}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {payrollResult.complianceChecklist.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                      <div className="w-6 h-6 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hiring Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-blue-400 font-bold text-lg">🔍 Hiring Recommendations</h4>
                <button
                  onClick={() => handleCopy(payrollResult.hiringRecommendations.join('\n'))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {payrollResult.hiringRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GlobalPayrollArchitect;