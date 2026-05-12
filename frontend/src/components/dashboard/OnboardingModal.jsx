import React, { useState } from 'react';

const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Jaipur', 'Hyderabad', 'Chennai', 'Kolkata', 'Udaipur', 'Goa', 'Pune'];
const BUDGETS = [
  { label: '5L to 15L', value: 'budget', desc: 'Intimate & Elegant' },
  { label: '15L to 50L', value: 'mid', desc: 'Classic Celebration' },
  { label: '50L to 1Cr+', value: 'luxury', desc: 'Grand & Lavish' },
];
const STYLES = [
  { label: 'Palatial Heritage', emoji: '🏰', value: 'palatial', desc: 'Royal forts & heritage venues' },
  { label: 'Modern Minimalist', emoji: '🌿', value: 'modern', desc: 'Clean lines, curated aesthetic' },
  { label: 'Bohemian Beach', emoji: '🏖️', value: 'bohemian', desc: 'Breezy, outdoor, natural' },
  { label: 'Classic Glamour', emoji: '✨', value: 'glamour', desc: 'Opulent, timeless, grand' },
];

const TITLES = ['Where is your wedding?', 'What is your budget?', 'What is your style?'];
const EMOJIS = ['📍', '💰', '💒'];

export default function OnboardingModal({ onComplete }) {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ city: '', budget: '', style: '' });

  const canNext = () => {
    if (step === 1) return !!prefs.city;
    if (step === 2) return !!prefs.budget;
    return !!prefs.style;
  };

  const handleFinish = () => {
    localStorage.setItem('planora_prefs', JSON.stringify(prefs));
    localStorage.setItem('planora_onboarded', 'true');
    onComplete(prefs);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(42,42,42,0.75)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ animation: 'fade-in-up 0.4s ease forwards' }}>

        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <div className="h-1.5 bg-wedding-gold transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <span className="text-5xl">{EMOJIS[step - 1]}</span>
            <h2 className="font-serif text-2xl text-gray-800 mt-3">{TITLES[step - 1]}</h2>
            <p className="text-sm text-gray-400 mt-1">Step {step} of 3 — Help us personalise your experience</p>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-2 gap-2">
              {CITIES.map(city => (
                <button key={city}
                  onClick={() => setPrefs(p => ({ ...p, city }))}
                  className={`p-3 border-2 text-sm font-medium transition-all !rounded-xl ${
                    prefs.city === city
                      ? 'border-wedding-gold bg-amber-50 text-amber-800'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}>
                  {city}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              {BUDGETS.map(b => (
                <button key={b.value}
                  onClick={() => setPrefs(p => ({ ...p, budget: b.value }))}
                  className={`w-full p-4 border-2 text-left transition-all !rounded-xl ${
                    prefs.budget === b.value
                      ? 'border-wedding-gold bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="font-semibold text-gray-800 text-sm">{b.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{b.desc}</div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              {STYLES.map(s => (
                <button key={s.value}
                  onClick={() => setPrefs(p => ({ ...p, style: s.value }))}
                  className={`w-full p-4 border-2 text-left transition-all !rounded-xl ${
                    prefs.style === s.value
                      ? 'border-wedding-gold bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <div className="font-semibold text-gray-800 text-sm">{s.emoji} {s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 text-sm !rounded-xl hover:bg-gray-50 transition-all">
                Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                className={`flex-1 py-3 text-sm font-semibold !rounded-xl transition-all ${
                  canNext() ? 'bg-wedding-gold text-white hover:bg-amber-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                Continue
              </button>
            ) : (
              <button onClick={handleFinish} disabled={!canNext()}
                className={`flex-1 py-3 text-sm font-semibold !rounded-xl transition-all ${
                  canNext() ? 'bg-wedding-gold text-white hover:bg-amber-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
                Start Planning
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
