export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function icon(name, cls = '') {
  const paths = {
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    spark:'<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6Z"/>',
    bars:'<path d="M5 20v-6m7 6V4m7 16V9"/>',
    globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
    chat:'<path d="M20 4H4v13h6l4 4v-4h6Z"/><path d="M8 9h8m-8 4h5"/>',
    link:'<path d="m10 14 4-4m-6 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 0 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 0) scale(.94)"/>',
    flag:'<path d="M5 22V3m0 1c5-4 9 4 15 0v11c-6 4-10-4-15 0"/>',
    map:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2Z"/><path d="M9 3v16m6-14v16"/>',
    flask:'<path d="M9 3h6m-5 0v7L4 20h16l-6-10V3m-6 12h8"/>',
    book:'<path d="M3 3h7l2 2 2-2h7v17h-7l-2 2-2-2H3Zm9 2v17"/>',
    note:'<path d="M5 3h14v18H5Zm4 5h6m-6 4h6m-6 4h4"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    play:'<path d="m7 3 14 9-14 9Z"/>',
    pause:'<path d="M8 4v16M16 4v16"/>',
    reset:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
    up:'<path d="m6 14 6-6 6 6"/>',
    external:'<path d="M14 3h7v7m0-7L10 14m0-10H4v16h16v-6"/>',
    folder:'<path d="M3 6h7l2 3h9v12H3Zm0 3V4h7l2 3h9v2"/>',
    heart:'<path d="M12 21 3 12C-2 4 9 0 12 8 15 0 26 4 21 12Z"/>',
    bolt:'<path d="m14 2-9 12h6l-1 8 9-13h-6Z"/>',
    eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
  };
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
}
export function toast(message) {
  const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('show');
  clearTimeout(toast.timer); toast.timer = setTimeout(()=>el.classList.remove('show'),3500);
}
export function download(name, text, mime = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text],{type:mime}));
  const a = document.createElement('a'); a.href=url; a.download=name; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}
export function highlight(text, terms) {
  const selected = new Set(terms);
  return String(text).split(/([\p{L}\p{N}]+)/gu).map(w=>selected.has(w.toLowerCase()) ? `<mark>${escapeHTML(w)}</mark>` : escapeHTML(w)).join('');
}
export const pct = n => n === null ? '—' : `${Math.round(n*100)}%`;
export function openDialog(title, html) {
  const dialog = document.querySelector('#source-dialog');
  document.querySelector('#dialog-content').innerHTML=`<div class="dialog-top"><span class="eyebrow">LOOK INSIDE</span><button class="icon-btn" id="close-dialog" aria-label="Close source">${icon('close')}</button></div><h2 id="dialog-title">${escapeHTML(title)}</h2>${html}`;
  document.querySelector('#close-dialog').onclick=()=>dialog.close();
  if (!dialog.open) dialog.showModal();
}
