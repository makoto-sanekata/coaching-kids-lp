/* ============================================================
   共通スクリプト — スタンプラリー・紙吹雪・スクロール出現
   ============================================================ */

/* ===== スタンプラリー（localStorageに保存） ===== */
const STAMP_KEY = 'coachingStamps';

function getStamps() {
  try {
    return JSON.parse(localStorage.getItem(STAMP_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function awardStamp(key) {
  const stamps = getStamps();
  if (stamps[key]) return false;          /* すでに獲得ずみ */
  stamps[key] = true;
  try { localStorage.setItem(STAMP_KEY, JSON.stringify(stamps)); } catch (e) { /* プライベートモード等では保存しない */ }
  return true;
}

function countStamps() {
  const stamps = getStamps();
  return ['authentic', 'goal', 'wheel', 'abstract'].filter(function (k) { return stamps[k]; }).length;
}

/* ===== 紙吹雪 ===== */
const CONFETTI_COLORS = ['#7c5cff', '#4db5ff', '#ff6fa5', '#ffd34d', '#4dd599', '#ff5a5a'];
function confetti(count) {
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    c.style.animationDuration = (1.8 + Math.random() * 1.6) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(c);
    setTimeout(function () { c.remove(); }, 4000);
  }
}

/* ===== スクロールで出現 ===== */
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
});
