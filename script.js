/* Deliberately dependency-free; also works when opening index.html directly. */
'use strict';
document.documentElement.classList.add('js');
const signalStrip = document.querySelector('.signal-strip');
const signalToggle = document.querySelector('.signal-toggle');
signalToggle.hidden = false;
signalToggle.addEventListener('click', () => {
  const paused = signalStrip.classList.toggle('is-paused');
  signalToggle.setAttribute('aria-pressed', String(paused));
  signalToggle.setAttribute('aria-label', paused ? 'Resume scrolling banner' : 'Pause scrolling banner');
  signalToggle.textContent = paused ? 'PLAY ▷' : 'PAUSE Ⅱ';
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
navigation.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeMenu(); menuButton.focus(); } });

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let lightboxOpener;
document.querySelectorAll('.screenshot-trigger').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof lightbox.showModal !== 'function') { window.open(button.dataset.image, '_blank', 'noopener'); return; }
    lightboxOpener = button;
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.querySelector('img').alt;
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('lightbox-open');
    document.querySelector('.lightbox-close').focus();
  });
});
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) {
  const rect = lightbox.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
} });
lightbox.addEventListener('close', () => { document.body.classList.remove('lightbox-open'); lightboxOpener?.focus(); });

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const copyStatus = document.querySelector('.copy-status');
function selectTab(tab, focus = false) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  copyStatus.textContent = '';
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
  });
});
document.querySelectorAll('.copy-address').forEach((button) => {
  button.addEventListener('click', async () => {
    const field = document.getElementById(button.dataset.address);
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(field.value);
        copied = true;
      }
    } catch { /* Local files and permission restrictions use the selection fallback. */ }
    if (!copied) {
      field.focus(); field.select(); field.setSelectionRange(0, field.value.length);
      try { copied = document.execCommand('copy'); } catch { copied = false; }
    }
    copyStatus.textContent = copied ? 'Address copied. Check the network before sending.' : 'Address selected. Press Ctrl+C (or Cmd+C) to copy.';
    if (copied) button.focus();
  });
});
