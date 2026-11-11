import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Gift, Volume2, VolumeX } from 'lucide-react';

export default function GrandmaBirthdayCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [playingMusic, setPlayingMusic] = useState(false);
  const [confetti, setConfetti] = useState([]);

  // Генерация частичек конфетти
  useEffect(() => {
    const items = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: i % 2 === 0 ? '#a855f7' : '#84cc16',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setConfetti(items);
  }, []);

  // Синтезатор простой праздничной мелодии
  const toggleMusic = () => {
    if (!playingMusic) {
      startTune();
      setPlayingMusic(true);
    } else {
      stopTune();
      setPlayingMusic(false);
    }
  };

  const startTune = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      window.cardAudioCtx = ctx;
      const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63];
      let time = ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, time + i * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.4 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time + i * 0.4);
        osc.stop(time + i * 0.4 + 0.35);
      });
    } catch (e) {}
  };

  const stopTune = () => {
    if (window.cardAudioCtx) {
      window.cardAudioCtx.close();
    }
  };

  return (
    <div style={styles.container}>
      {/* Фоновые неоновые пятна */}
      <div style={{ ...styles.glowBlob, top: '15%', left: '15%', background: 'rgba(168, 85, 247, 0.15)' }} />
      <div style={{ ...styles.glowBlob, bottom: '15%', right: '15%', background: 'rgba(132, 204, 22, 0.1)' }} />

      {/* Падающие частички */}
      <div style={styles.confettiContainer}>
        {confetti.map((c) => (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
              opacity: 0.6,
              animation: `bounce ${c.duration}s infinite ease-in-out ${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Кнопка включения музыки */}
      <button onClick={toggleMusic} style={styles.musicBtn} title="Включить музыку">
        {playingMusic ? <Volume2 size={24} color="#a855f7" /> : <VolumeX size={24} color="#94a3b8" />}
      </button>

      {/* 3D Контейнер карточки */}
      <div style={styles.cardWrapper}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            ...styles.cardInner,
            transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* СТОРОНА 1: ЛИЦЕВАЯ */}
          <div style={styles.cardFront}>
            <div style={styles.headerBadge}>
              <Sparkles size={16} color="#84cc16" />
              <span>Особенный день</span>
              <Sparkles size={16} color="#84cc16" />
            </div>

            <div style={styles.frontBody}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Heart size={96} color="#a855f7" style={{ filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.8))' }} />
                <Gift size={40} color="#84cc16" style={styles.giftIcon} />
              </div>
              <h1 style={styles.mainTitle}>Любимой Бабушке</h1>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>С Днём Рождения! ❤️</p>
            </div>

            <div style={styles.openHint}>
              Нажми на открытку, чтобы открыть 💌
            </div>
          </div>

          {/* СТОРОНА 2: ПОЗДРАВЛЕНИЕ */}
          <div style={styles.cardBack}>
            <div style={{ textAlign: 'center' }}>
              <div style={styles.iconCircle}>
                <Heart size={32} color="#84cc16" />
              </div>
              <h2 style={styles.backTitle}>Дорогая моя бабушка!</h2>

              <div style={styles.textBlock}>
                <p>
                  Поздравляю тебя с Днём Рождения! Спасибо тебе за твое бесконечное тепло, заботу, доброе сердце и самые вкусные угощения на свете.
                </p>
                <p>
                  Желаю тебе крепчайшего здоровья, улыбок, душевного спокойствия и счастья в каждом новом дне!
                </p>
                <p style={{ color: '#84cc16', fontWeight: '600' }}>
                  Пусть каждый день приносит только радость! ✨
                </p>
              </div>
            </div>

            <div style={styles.footerBlock}>
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px' }}>
                С любовью
              </span>
              <div style={styles.signature}>Твой внук</div>
            </div>
          </div>
        </div>
      </div>

      {/* Встроенные ключевые кадры анимаций */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}

// Стили
const styles = {
  container: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#020617',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#f8fafc',
  },
  glowBlob: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    filter: 'blur(80px)',
    pointerEvents: 'none',
  },
  confettiContainer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  musicBtn: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    zIndex: 30,
    padding: '12px',
    borderRadius: '50%',
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '420px',
    height: '560px',
    perspective: '1000px',
  },
  cardInner: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
  },
  cardFront: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    boxShadow: '0 0 40px rgba(168, 85, 247, 0.2)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  cardBack: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)',
    border: '1px solid rgba(132, 204, 22, 0.3)',
    boxShadow: '0 0 40px rgba(132, 204, 22, 0.2)',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  },
  headerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#84cc16',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  frontBody: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  giftIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: '800',
    margin: 0,
    background: 'linear-gradient(to right, #c084fc, #f472b6, #a3e635)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  openHint: {
    width: '100%',
    textAlign: 'center',
    padding: '12px',
    borderRadius: '12px',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
    color: '#d8b4fe',
    fontSize: '14px',
    fontWeight: '500',
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'rgba(132, 204, 22, 0.1)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  backTitle: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 16px 0',
  },
  textBlock: {
    color: '#cbd5e1',
    fontSize: '14px',
    lineHeight: '1.6',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  footerBlock: {
    textAlign: 'center',
    borderTop: '1px solid #1e293b',
    paddingTop: '16px',
  },
  signature: {
    fontSize: '20px',
    fontWeight: '700',
    marginTop: '4px',
    background: 'linear-gradient(to right, #c084fc, #a3e635)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
};