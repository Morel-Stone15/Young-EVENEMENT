let toastTimer;
function toast(msg, type = 'info') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  clearInterval(el._timer);
  el._timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur;
    if (cur >= target) clearInterval(el._timer);
  }, 40);
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);

  const prog = document.getElementById('progress');
  if (prog) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (window.scrollY / max * 100) + '%';
  }
});

function checkAdmin() {
  const pass = prompt("Accès Administrateur - Entrez le mot de passe :");
  if (pass === '12345Gts') {
    window.location.href = 'admin.html';
  } else if (pass !== null) {
    toast("Mot de passe incorrect", "error");
  }
}
