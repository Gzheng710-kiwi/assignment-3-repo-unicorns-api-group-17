let lastResults = null;

document.getElementById("searchBtn").addEventListener("click", searchUnicorns);

async function searchUnicorns() {
  let url = `http://localhost:3000/unicorns?`;

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

  const total = document.createElement("h2");
  total.style.textAlign = "center";
  total.style.fontWeight = "bold";
  total.style.marginBottom = "20px";
  total.style.color = "#ca2366";
  total.innerText = `Total Unicorns: ${list.length}`;
  container.appendChild(total);

  const bigCard = document.createElement("div");
  bigCard.className = "card";
  bigCard.style.maxWidth = "900px";
  bigCard.style.margin = "0 auto";

  let html = "";

  list.forEach((u, index) => {
    html += `
      <div style="padding: 15px 0;">
        <div style="font-size:20px; font-weight:bold;">${u.name}</div>
    `;

    if (showLoves.checked) {
      html += `<p>Loves: ${u.loves.join(", ")}</p>`;
    }
    if (showWeight.checked) {
      html += `<p>Weight: ${u.weight}</p>`;
    }
    if (showGender.checked) {
      html += `<p>Gender: ${u.gender}</p>`;
    }
    if (showVampires.checked) {
      html += `<p>Vampires: ${u.vampires}</p>`;
    }
    if (showVaccinated.checked) {
      html += `<p>Vaccinated: ${u.vaccinated}</p>`;
    }
    if (showExists.checked) {
      html += `<p>Vampires Exists: ${u.vampiresExists}</p>`;
    }

    html += `</div>`;
  });

  bigCard.innerHTML = html;
  container.appendChild(bigCard);
}
const checkboxes = [
  showLoves,
  showWeight,
  showGender,
  showVampires,
  showVaccinated,
  showExists,
];
checkboxes.forEach((cb) => {
  cb.addEventListener("change", async () => {
    if (!lastResults || lastResults.length == 0) {
      await searchAll();
      return;
    }
    renderUnicorns(lastResults);
  });
});
async function searchAll() {
  const res = await fetch("http://localhost:3000/unicorns");
  const unicorns = await res.json();
  lastResults = unicorns;
  renderUnicorns(unicorns);
}
// window.addEventListener("DOMContentLoaded", searchAll);
