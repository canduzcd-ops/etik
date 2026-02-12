import React, { useState } from 'react';
import { Language, Theme, AnalysisResult } from '../types';
import { THEMES } from '../constants';
import { trackEvent, Events } from '../services/analytics';
import { recordShare } from '../services/gamification';

interface ShareSheetProps {
  result: AnalysisResult;
  language: Language;
  theme: Theme;
  onClose: () => void;
  onBadgeEarned?: (badges: string[]) => void;
}

const ShareSheet: React.FC<ShareSheetProps> = ({ result, language, theme, onClose, onBadgeEarned }) => {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const currentTheme = THEMES[theme];

  const shareText = language === Language.TR
    ? `🧠 ETİK Analiz\n\n"${result.dilemma.slice(0, 120)}${result.dilemma.length > 120 ? '...' : ''}"\n\n💡 ${result.summary.slice(0, 200)}${result.summary.length > 200 ? '...' : ''}\n\n⚖️ Kant · 📊 Mill · 🏺 Aristoteles\n\n#ETİK #EtikKarar #Felsefe`
    : `🧠 ETİK Analysis\n\n"${result.dilemma.slice(0, 120)}${result.dilemma.length > 120 ? '...' : ''}"\n\n💡 ${result.summary.slice(0, 200)}${result.summary.length > 200 ? '...' : ''}\n\n⚖️ Kant · 📊 Mill · 🏺 Aristotle\n\n#ETİK #Ethics #Philosophy`;

  const whatsappText = language === Language.TR
    ? `Bak bu ilginç bir etik ikilem:\n\n"${result.dilemma.slice(0, 150)}"\n\n${result.summary.slice(0, 200)}\n\nSen ne dersin? 🤔\n\nETİK uygulaması ile analiz ettim.`
    : `Check out this ethical dilemma:\n\n"${result.dilemma.slice(0, 150)}"\n\n${result.summary.slice(0, 200)}\n\nWhat do you think? 🤔\n\nAnalyzed with ETİK app.`;

  const doShare = () => {
    const { newBadges } = recordShare();
    if (newBadges.length > 0 && onBadgeEarned) onBadgeEarned(newBadges);
  };

  const handleCopy = async () => {
    trackEvent(Events.SHARE_COPY);
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    doShare();
    trackEvent(Events.SHARE_SUCCESS, { method: 'copy' });
    setTimeout(() => setCopied(false), 2000);
  };

  /* ---- Canvas-based story card (9:16) ---- */
  const generateCard = async (): Promise<Blob | null> => {
    const W = 540, H = 960;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // BG gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0F0F0F');
    grad.addColorStop(1, '#1A1A2E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Glow
    const r = ctx.createRadialGradient(W / 2, H * 0.25, 0, W / 2, H * 0.25, W);
    r.addColorStop(0, 'rgba(100,100,255,0.06)');
    r.addColorStop(1, 'transparent');
    ctx.fillStyle = r;
    ctx.fillRect(0, 0, W, H);

    // Title
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('ETİK', W / 2, 80);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '11px sans-serif';
    ctx.fillText('ETİK KARAR DANIŞMANI', W / 2, 108);

    // Divider
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(40, 135);
    ctx.lineTo(W - 40, 135);
    ctx.stroke();

    // Dilemma
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = 'italic 14px Georgia, serif';
    ctx.textAlign = 'left';
    let y = 175;
    for (const line of wrap(ctx, `"${result.dilemma}"`, W - 80).slice(0, 4)) {
      ctx.fillText(line, 40, y);
      y += 22;
    }

    // Summary box
    y += 20;
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    roundRect(ctx, 30, y, W - 60, 220, 20);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SENTEZ VE REHBERLİK', 50, y + 28);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'italic 15px Georgia, serif';
    let sy = y + 55;
    for (const l of wrap(ctx, result.summary, W - 120).slice(0, 7)) {
      ctx.fillText(l, 50, sy);
      sy += 22;
    }

    // Framework tags
    const tagY = H - 200;
    const tagW = (W - 80 - 20) / 3;
    ['⚖️ Kant', '📊 Mill', '🏺 Aristoteles'].forEach((tag, i) => {
      const tx = 40 + i * (tagW + 10);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      roundRect(ctx, tx, tagY, tagW, 50, 12);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(tag, tx + tagW / 2, tagY + 30);
    });

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = '11px sans-serif';
    ctx.fillText('ETİK · Etik Karar Danışmanın', W / 2, H - 70);
    ctx.fillText('© 2026 Raca Labs', W / 2, H - 50);

    return new Promise(res => canvas.toBlob(res, 'image/png'));
  };

  const handleShareImage = async () => {
    trackEvent(Events.SHARE_IMAGE);
    setGenerating(true);
    try {
      const blob = await generateCard();
      if (!blob) return;
      const file = new File([blob], 'etik-analiz.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'ETİK Analiz' });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'etik-analiz.png';
        a.click();
        URL.revokeObjectURL(url);
      }
      doShare();
      trackEvent(Events.SHARE_SUCCESS, { method: 'image' });
    } catch { /* user cancelled */ } finally {
      setGenerating(false);
    }
  };

  const handleWhatsApp = () => {
    trackEvent(Events.SHARE_WHATSAPP);
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
    doShare();
    trackEvent(Events.SHARE_SUCCESS, { method: 'whatsapp' });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div
        className={`w-full max-w-md ${currentTheme.bg} rounded-t-[40px] p-8 pb-14 space-y-6 shadow-2xl border-t ${currentTheme.border} animate-in slide-in-from-bottom-10 duration-500`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold serif">{language === Language.TR ? 'Paylaş' : 'Share'}</h3>
          <button onClick={onClose} className="p-2 opacity-40 hover:opacity-100">✕</button>
        </div>

        <div className="space-y-3">
          {/* Copy Text */}
          <button onClick={handleCopy} className={`w-full flex items-center gap-4 p-5 rounded-2xl border ${currentTheme.border} ${currentTheme.primary} hover:shadow-lg active:scale-[0.98] transition-all`}>
            <span className="text-2xl">{copied ? '✅' : '📋'}</span>
            <div className="text-left flex-1">
              <p className="font-bold text-sm">{copied ? (language === Language.TR ? 'Kopyalandı!' : 'Copied!') : (language === Language.TR ? 'Metni Kopyala' : 'Copy Text')}</p>
              <p className="text-[10px] opacity-40">{language === Language.TR ? 'Analiz özetini panoya kopyala' : 'Copy analysis summary to clipboard'}</p>
            </div>
          </button>

          {/* Visual Card */}
          <button onClick={handleShareImage} disabled={generating} className={`w-full flex items-center gap-4 p-5 rounded-2xl border ${currentTheme.border} ${currentTheme.primary} hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-40`}>
            <span className="text-2xl">{generating ? '⏳' : '🖼️'}</span>
            <div className="text-left flex-1">
              <p className="font-bold text-sm">{language === Language.TR ? 'Görsel Kart Paylaş' : 'Share Visual Card'}</p>
              <p className="text-[10px] opacity-40">{language === Language.TR ? 'Story uyumlu görsel oluştur' : 'Create a story-format image'}</p>
            </div>
          </button>

          {/* WhatsApp */}
          <button onClick={handleWhatsApp} className={`w-full flex items-center gap-4 p-5 rounded-2xl border ${currentTheme.border} ${currentTheme.primary} hover:shadow-lg active:scale-[0.98] transition-all`}>
            <span className="text-2xl">💬</span>
            <div className="text-left flex-1">
              <p className="font-bold text-sm">{language === Language.TR ? "WhatsApp'ta Paylaş" : 'Share on WhatsApp'}</p>
              <p className="text-[10px] opacity-40">{language === Language.TR ? 'Arkadaşlarınla tartış' : 'Discuss with friends'}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---- Canvas helpers ---- */
function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let cur = words[0] || '';
  for (let i = 1; i < words.length; i++) {
    const test = cur + ' ' + words[i];
    if (ctx.measureText(test).width < max) cur = test;
    else { lines.push(cur); cur = words[i]; }
  }
  lines.push(cur);
  return lines;
}
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default ShareSheet;
