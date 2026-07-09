const VISIBLE_WHEN_COLLAPSED = 4;

export function initProjectListCollapse(): void {
  const list = document.querySelector<HTMLElement>('.project-list');
  const toggle = document.querySelector<HTMLButtonElement>('.project-more');
  if (!list || !toggle) return;

  const items = Array.from(list.querySelectorAll<HTMLElement>('.project-item'));
  const collapsible = items.slice(VISIBLE_WHEN_COLLAPSED);
  if (collapsible.length === 0) {
    toggle.hidden = true;
    return;
  }

  let expanded = false;
  function render() {
    collapsible.forEach((el) => { el.hidden = !expanded; });
    toggle!.textContent = expanded ? '↑ show less' : `↓ show ${collapsible.length} more`;
    toggle!.setAttribute('aria-expanded', String(expanded));
  }
  toggle.hidden = false;
  render();

  toggle.addEventListener('click', () => {
    expanded = !expanded;
    render();
  });
}
