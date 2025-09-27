// Mobile nav toggle
const menuBtn = document.querySelector('.nav__menu');
const navLinks = document.querySelector('.nav__links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navLinks.style.display = expanded ? 'none' : 'flex';
  });
}

// Role Filters + Search
const filterTeam = document.getElementById('filter-team');
const filterLoc  = document.getElementById('filter-location');
const searchBox  = document.getElementById('search-roles');
const rolelist   = document.getElementById('rolelist');

function filterRoles() {
  const team = filterTeam?.value ?? 'all';
  const loc = filterLoc?.value ?? 'any';
  const q = (searchBox?.value ?? '').toLowerCase().trim();

  rolelist.querySelectorAll('.role').forEach((card) => {
    const cardTeam = card.getAttribute('data-team');
    const cardLoc  = card.getAttribute('data-location');
    const text = card.innerText.toLowerCase();

    const teamOk = team === 'all' || cardTeam === team;
    const locOk  = loc === 'any' || cardLoc === loc;
    const qOk    = q.length === 0 || text.includes(q);

    card.style.display = teamOk && locOk && qOk ? '' : 'none';
  });
}
[filterTeam, filterLoc, searchBox].forEach(el => el && el.addEventListener('input', filterRoles));

// Role Details expand/collapse
document.querySelectorAll('.js-view').forEach((btn) => {
  btn.addEventListener('click', () => {
    const details = btn.closest('.role').querySelector('.role__details');
    const isHidden = details.hasAttribute('hidden');
    details.toggleAttribute('hidden');
    btn.textContent = isHidden ? 'Hide details' : 'View details';
  });
});

// Apply form (client-side demo only)
const form = document.getElementById('apply-form');
const msg = document.getElementById('form-msg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // Simple validation
  if (!data.name || !data.email || !data.role || !data.location || !data.about) {
    msg.textContent = 'Please fill all required fields.';
    return;
  }
  msg.textContent = 'Thanks! Your application has been received.';
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
