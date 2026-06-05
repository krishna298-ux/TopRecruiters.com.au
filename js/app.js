const agencies = [
  {
    name: "WOW Recruitment",
    location: "Sydney",
    industry: "Marketing",
    roleType: "Executive",
    salary: "$120k - $180k",
    rating: 4.6,
    reviews: 48,
    specialties: ["Executive Search", "Marketing", "Sales", "People & Culture"]
  },
  {
    name: "Bluefin Resources",
    location: "Sydney",
    industry: "Financial Services",
    roleType: "Permanent",
    salary: "$180k+",
    rating: 4.4,
    reviews: 62,
    specialties: ["Financial Services", "Technology", "Risk", "Transformation"]
  },
  {
    name: "Talentpath Recruitment",
    location: "Brisbane",
    industry: "Technology",
    roleType: "Permanent",
    salary: "$80k - $120k",
    rating: 4.2,
    reviews: 35,
    specialties: ["Technology", "Sales", "HR", "Customer Experience"]
  },
  {
    name: "Six Degrees Executive",
    location: "Melbourne",
    industry: "Retail",
    roleType: "Executive",
    salary: "$180k+",
    rating: 4.7,
    reviews: 55,
    specialties: ["Executive Search", "Consumer", "Retail", "Supply Chain"]
  }
];

function renderAgencies(data) {
  const container = document.getElementById("agencyResults");
  const count = document.getElementById("resultCount");
  container.innerHTML = "";
  count.textContent = data.length;

  if (data.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="agency-card text-center">
          <h5 class="fw-bold">No agencies found</h5>
          <p class="text-muted mb-0">Try changing your filters.</p>
        </div>
      </div>
    `;
    return;
  }

  data.forEach(agency => {
    const tags = agency.specialties.map(tag => `<span class="tag">${tag}</span>`).join("");

    container.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <a href="#" class="agency-link">
          <div class="agency-card">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5 class="fw-bold mb-1">${agency.name}</h5>
                <div class="agency-meta">${agency.location} • ${agency.industry}</div>
              </div>
              <div class="score-badge">${agency.rating}</div>
            </div>

            <p class="text-muted small mb-2">${agency.reviews} reviews • ${agency.roleType} • ${agency.salary}</p>
            <div>${tags}</div>
          </div>
        </a>
      </div>
    `;
  });
}

function filterAgencies() {
  const location = document.getElementById("locationFilter").value;
  const industry = document.getElementById("industryFilter").value;
  const roleType = document.getElementById("roleFilter").value;
  const salary = document.getElementById("salaryFilter").value;

  const filtered = agencies.filter(agency => {
    return (
      (location === "All Locations" || agency.location === location) &&
      (industry === "All Industries" || agency.industry === industry) &&
      (roleType === "All Role Types" || agency.roleType === roleType) &&
      (salary === "Any Salary" || agency.salary === salary)
    );
  });

  renderAgencies(filtered);
}

renderAgencies(agencies);
