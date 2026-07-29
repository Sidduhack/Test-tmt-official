// admin/js/sidebar.js
import { logout, getCurrentUser } from './auth.js';
import { initials } from './utils.js';
import { refreshIcons } from './ui.js';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  videos: 'Videos',
  subscribers: 'Subscribers',
  feedback: 'Feedback',
  downloads: 'Downloads',
  settings: 'Settings',
  analytics: 'Analytics'
};

export async function initShell() {
  const sidebarSlot = document.getElementById('sidebar-slot');
  const navbarSlot = document.getElementById('navbar-slot');

  if (!sidebarSlot || !navbarSlot) {
    throw new Error('index.html is missing #sidebar-slot or #navbar-slot');
  }

  const [sidebarHtml, navbarHtml] = await Promise.all([
    fetch('/components/sidebar.html').then(r => r.text()),
    fetch('/components/navbar.html').then(r => r.text())
  ]);

  sidebarSlot.innerHTML = sidebarHtml;
  navbarSlot.innerHTML = navbarHtml;

  highlightRoute();
  updateTitle();
  attachEvents();
  refreshIcons();
}

function highlightRoute() {
  const route = (location.hash || '#/dashboard').replace('#/','');
  document.querySelectorAll('[data-route]').forEach(el=>{
    el.classList.toggle('active', el.dataset.route===route);
  });
}

function updateTitle() {
  const route=(location.hash||'#/dashboard').replace('#/','');
  const title=document.getElementById('page-title');
  if(title) title.textContent=PAGE_TITLES[route]||'Dashboard';
}

function attachEvents(){
  window.addEventListener('hashchange',()=>{
    highlightRoute();
    updateTitle();
  });

  const logoutBtn=document.getElementById('logout-btn');
  if(logoutBtn){
    logoutBtn.onclick=()=>logout();
  }

  const user=getCurrentUser?.();
  const avatar=document.getElementById('avatar-initials');
  if(user && avatar){
    avatar.textContent=initials(user.email || user.name || 'A');
  }
}

export function setFeedbackBadge(count){
  const badge=document.getElementById('feedback-badge');
  if(!badge) return;
  badge.textContent=count||'';
  badge.style.display=count?'inline-flex':'none';
}

export function setPageSearchPlaceholder(text){
  const input=document.getElementById('global-search');
  if(input) input.placeholder=text;
}
