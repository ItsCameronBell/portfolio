export function initTabs(): void {
  const btns = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
  const panels = document.querySelectorAll<HTMLElement>('.tab-panel');
  if (btns.length === 0) return;

  function activate(tabId: string) {
    btns.forEach((b) => {
      const isTarget = b.dataset['tab'] === tabId;
      b.classList.toggle('active', isTarget);
      b.setAttribute('aria-selected', String(isTarget));
      b.tabIndex = isTarget ? 0 : -1;
    });
    panels.forEach((p) => p.classList.remove('active'));
    document.getElementById(`tab-${tabId}`)?.classList.add('active');
  }

  const initial = window.location.hash.slice(1);
  const validTabs = Array.from(btns).map((b) => b.dataset['tab']);
  const start = initial && validTabs.includes(initial) ? initial : validTabs[0];
  if (start) activate(start);

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset['tab'];
      if (tab) {
        activate(tab);
        history.replaceState(null, '', `#${tab}`);
      }
    });

    btn.addEventListener('keydown', (e) => {
      let next: HTMLButtonElement | undefined;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        next = btns[(i + dir + btns.length) % btns.length];
      } else if (e.key === 'Home') {
        next = btns[0];
      } else if (e.key === 'End') {
        next = btns[btns.length - 1];
      } else {
        return;
      }
      e.preventDefault();
      next?.focus();
      next?.click();
    });
  });
}
