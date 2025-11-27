let lastResults = null;

document.getElementById("searchBtn").addEventListener("click", searchUnicorns);

async function searchUnicorns() {
  let url = `https://assignment-3-repo-unicorns-api-group-17.onrender.com/unicorns?`;

  if (unicornNameInput.value) url += `name=${unicornNameInput.value}&`;

  if (unicornWeightInput.value)
    url += `weightGreaterThan=${unicornWeightInput.value}&`;

  if (unicornLovesInput.value) url += `loves=${unicornLovesInput.value}&`;

  if (unicornGenderInput.value) url += `gender=${unicornGenderInput.value}&`;

  if (unicornVampiresInput.value)
    url += `vampiresGreaterThan=${unicornVampiresInput.value}&`;

  if (unicornVaccinatedInput.value)
    url += `vaccinated=${unicornVaccinatedInput.value}&`;

  if (unicornVampiresExistsInput.value)
    url += `vampiresExists=${unicornVampiresExistsInput.value}&`;

  const res = await fetch(url);
  const unicorns = await res.json();
  lastResults = unicorns;

  renderUnicorns(unicorns);
}

function renderUnicorns(list) {
  const container = document.getElementById("resultDiv");
  container.innerHTML = "";

  // total count
  const total = document.createElement("h2");
  total.style.textAlign = "center";
  total.style.fontWeight = "bold";
  total.style.marginBottom = "20px";
  total.style.color = "#ca2366";
  total.innerText = `Total Unicorns: ${list.length}`;
  container.appendChild(total);

  if (list.length === 0) {
    container.innerHTML += "<p>No unicorns found.</p>";
    return;
  }

  // Create table
  const table = document.createElement("table");
  table.style.width = "90%";
  table.style.margin = "0 auto";
  table.style.borderCollapse = "collapse";
  table.style.background = "#fffafe";
  table.style.color = "#ca2366";
  table.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
  table.style.borderRadius = "10px";
  table.style.overflow = "hidden";

  // HEADER ROW
  const headerRow = document.createElement("tr");

  function addHeaderCell(text, id) {
    if (!id || document.getElementById(id).checked) {
      const th = document.createElement("th");
      th.innerText = text;
      th.style.borderBottom = "2px solid #ff9ccc";
      th.style.padding = "12px";
      th.style.background = "#ffdef0";
      th.style.fontSize = "16px";
      th.style.fontWeight = "bold";
      headerRow.appendChild(th);
    }
  }

  // Name always shown
  addHeaderCell("Name");

  addHeaderCell("Loves", "showLoves");
  addHeaderCell("Weight", "showWeight");
  addHeaderCell("Gender", "showGender");
  addHeaderCell("Vampires", "showVampires");
  addHeaderCell("Vaccinated", "showVaccinated");
  addHeaderCell("Vampires Exists", "showExists");

  table.appendChild(headerRow);

  // DATA ROWS
  list.forEach((u) => {
    const row = document.createElement("tr");

    function addCell(content, id) {
      if (!id || document.getElementById(id).checked) {
        const td = document.createElement("td");
        td.innerHTML = content;
        td.style.padding = "10px";
        td.style.borderBottom = "1px solid #ffd3e5";
        row.appendChild(td);
      }
    }

    addCell(`<strong>${u.name}</strong>`);

    addCell(u.loves.join(", "), "showLoves");
    addCell(u.weight, "showWeight");
    addCell(u.gender, "showGender");
    addCell(u.vampires, "showVampires");
    addCell(u.vaccinated, "showVaccinated");
    addCell(u.vampiresExists, "showExists");

    table.appendChild(row);
  });

  container.appendChild(table);
}
async function searchAll() {
  const res = await fetch(
    "https://assignment-3-repo-unicorns-api-group-17.onrender.com/unicorns"
  );
  const unicorns = await res.json();
  lastResults = unicorns;
  renderUnicorns(unicorns);
}
// window.addEventListener("DOMContentLoaded", searchAll);
