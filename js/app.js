const SUPABASE_URL = "https://lqpzapnmmfuupeghaajc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable__w3i28yrihzjHfgy1nSfqg_BRRYkqCn";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

let agencies = [];

async function loadAgencies() {
  const { data, error } = await supabaseClient
    .from("agencies")
    .select("*")
    .order("name", { ascending: true });

  const container = document.getElementById("agencyResults");
  const count = document.getElementById("resultCount");

  if (error) {
    console.error("Error loading agencies:", error);
    container.innerHTML = `
      <div class="col-12">
        <div class="agency-card text-center">
          <h5 class="fw-bold">Error loading agencies</h5>
          <p class="text-muted mb-0">Check your Supabase connection, permissions, and table data.</p>
        </div>
      </div>
    `;
    count.textContent = "0";
    return;
  }

  agencies = data || [];
  renderAgencies(agencies);
}

function renderAgencies(data) {
  const container = document.getElementById("agencyResults");
  const count = document.getElementById("resultCount");

  container.innerHTML = "";
  count.textContent = data.length;

  if (!data.length) {
    container.innerHTML = `
      <div class="col-12">
        <div class="agency-card text-center">
          <h5 class="fw-bold">No agencies found</h5>
          <p class="text-muted mb-0">Add some rows into your Supabase agencies table.</p>
        </div>
      </div>
    `;
    return;
  }

  data.forEach((agency) => {
    container.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="agency-card">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="fw-bold mb-1">${agency.name || ""}</h5>
              <div class="agency-meta">
                ${agency.city || "Unknown city"} • ${agency.state || "Unknown state"}
              </div>
            </div>
            <div class="score-badge">4.5</div>
          </div>

          <p class="text-muted small mb-2">
            ${agency.recruiter_type || "Generalist recruiter"}
          </p>

          <div class="mb-2">
            <span class="tag">${agency.industry_focus || "Multi-industry"}</span>
          </div>

          <p class="text-muted small mb-2">
            ${agency.years_of_operation || ""}
          </p>

          ${
            agency.website_url
              ? `<a href="${agency.website_url}" target="_blank" class="small">Visit Website</a>`
              : ""
          }
        </div>
      </div>
    `;
  });
}

function filterAgencies() {
  const location = document.getElementById("locationFilter").value;
  const industry = document.getElementById("industryFilter").value;
  const roleType = document.getElementById("roleFilter").value;

  const filtered = agencies.filter((agency) => {
    const matchesLocation =
      location === "All Locations" ||
      (agency.city && agency.city.toLowerCase() === location.toLowerCase()) ||
      (agency.state && agency.state.toLowerCase() === location.toLowerCase());

    const matchesIndustry =
      industry === "All Industries" ||
      (agency.industry_focus &&
        agency.industry_focus.toLowerCase().includes(industry.toLowerCase()));

    const matchesRoleType =
      roleType === "All Role Types" ||
      (agency.recruiter_type &&
        agency.recruiter_type.toLowerCase().includes(roleType.toLowerCase()));

    return matchesLocation && matchesIndustry && matchesRoleType;
  });

  renderAgencies(filtered);
}

loadAgencies();
