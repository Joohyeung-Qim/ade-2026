'use strict';
(() => {
 // Convenience lock for a static site, not server-side authentication.
 const key = 'ade2026.access.v1';
 const root = document.documentElement;
 try { if (localStorage.getItem(key) === 'granted') root.classList.add('plan-unlocked'); } catch (_) {}
 document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('accessForm');
  const input = document.getElementById('accessCode');
  const error = document.getElementById('accessError');
  const content = document.getElementById('planContent');
  const sync = () => {
   const unlocked = root.classList.contains('plan-unlocked');
   content.inert = !unlocked;
   document.getElementById('accessGate').hidden = unlocked;
  };
  sync();
  input.addEventListener('input', () => {
   input.value = input.value.replace(/[^0-9]/g, '').slice(0, 4);
   input.removeAttribute('aria-invalid'); error.textContent = '';
  });
  form.addEventListener('submit', e => {
   e.preventDefault();
   if (input.value !== '1004') {
    error.textContent = '비밀번호를 확인해 주세요.';
    input.setAttribute('aria-invalid', 'true'); input.select(); input.focus(); return;
   }
   try { localStorage.setItem(key, 'granted'); }
   catch (_) { document.getElementById('accessNotice').textContent = '브라우저 저장이 차단되어 다음 방문에는 비밀번호를 다시 입력해야 합니다.'; }
   input.value = ''; root.classList.add('plan-unlocked'); sync();
   document.getElementById('accessWelcome').focus({preventScroll:true});
   window.scrollTo(0, 0); window.dispatchEvent(new Event('resize'));
  });
  document.getElementById('lockDevice').addEventListener('click', () => {
   try { localStorage.removeItem(key); } catch (_) {}
   root.classList.remove('plan-unlocked'); sync();
   error.textContent = ''; input.value = ''; window.scrollTo(0, 0); input.focus();
  });
 });
})();
