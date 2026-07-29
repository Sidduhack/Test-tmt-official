// admin/js/analytics.js
import { apiFetch } from "./auth.js";
import { toast } from "./notifications.js";

export async function render(container){
  container.innerHTML=`
    <div class="page-header">
      <div>
        <h2>Analytics</h2>
        <p>Traffic, visitors and engagement statistics.</p>
      </div>
    </div>

    <div class="glass-card panel">
      <div class="panel-header">
        <h3>Analytics Overview</h3>
      </div>

      <div id="analytics-content" style="padding:24px">
        <div class="skeleton" style="height:160px;border-radius:16px"></div>
      </div>
    </div>
  `;

  try{
    const data=await apiFetch("/analytics?range=30d");
    const el=document.getElementById("analytics-content");
    el.innerHTML=`
      <div class="stats-grid">
        <div class="glass-card stat-card">
          <div class="stat-label">Visitors</div>
          <div class="stat-value">${data?.totals?.visitors ?? 0}</div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-label">Page Views</div>
          <div class="stat-value">${data?.totals?.page_views ?? 0}</div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-label">Subscribers</div>
          <div class="stat-value">${data?.totals?.subscribers ?? 0}</div>
        </div>
        <div class="glass-card stat-card">
          <div class="stat-label">Downloads</div>
          <div class="stat-value">${data?.totals?.downloads ?? 0}</div>
        </div>
      </div>
      <p style="margin-top:20px">Detailed charts are available from the Dashboard page.</p>
    `;
  }catch(err){
    toast.error("Analytics","Unable to load analytics.");
  }

  return ()=>{};
}
