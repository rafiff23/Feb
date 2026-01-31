import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Copy, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import { WishTone, WishRequest } from '../types';
import { generateBirthdayWish } from '../services/geminiService';

interface WishGeneratorProps {
  onBack: () => void;
}

const WishGenerator: React.FC<WishGeneratorProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<WishRequest>({
    name: '',
    relationship: 'Friend',
    tone: WishTone.HEARTFELT,
    hobbies: '',
  });
  const [generatedWish, setGeneratedWish] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!formData.name) return;
    
    setLoading(true);
    const wish = await generateBirthdayWish(formData);
    setGeneratedWish(wish);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/50">
      <div className="p-8">
        <div className="flex items-center mb-6">
            <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 font-sans">AI Wish Writer</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Who is it for?</label>
            <input
              type="text"
              placeholder="Name (e.g. Alex)"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                >
                <option>Friend</option>
                <option>Partner</option>
                <option>Family</option>
                <option>Colleague</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value as WishTone })}
                >
                {Object.values(WishTone).map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                ))}
                </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interests/Hobbies (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Hiking, Cats, Sci-Fi"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all"
              value={formData.hobbies || ''}
              onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !formData.name}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 text-white font-semibold shadow-lg transform transition-all active:scale-95 ${
              loading || !formData.name 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-xl'
            }`}
          >
            {loading ? (
               <RefreshCw className="animate-spin w-5 h-5" />
            ) : (
                <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Wish</span>
                </>
            )}
          </button>
        </div>

        {/* Result Area */}
        <motion.div 
            layout
            initial={false}
            animate={{ height: generatedWish ? 'auto' : 0, opacity: generatedWish ? 1 : 0 }}
            className="overflow-hidden"
        >
            {generatedWish && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="relative bg-yellow-50 p-6 rounded-xl border border-yellow-100 shadow-inner">
                        <p className="font-handwriting text-2xl text-gray-800 leading-relaxed text-center">
                            "{generatedWish}"
                        </p>
                        <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-yellow-100 rounded-full transition-colors"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
      </div>
    </div>
  );
};

export default WishGenerator;
