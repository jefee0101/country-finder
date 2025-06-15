// Fetch country data from REST Countries API and display it
function getCountry() {
  const name = document.getElementById("countryInput").value.trim();
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("errorMsg");

  resultDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (!name) {
    errorDiv.textContent = 'Please enter a country name.';
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Country not found");
      }
      return response.json();
    })
    .then(data => {
      const country = data[0];
      const html = `
        <h3>${country.name.common}</h3>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name}</p>
        <p><strong>Language:</strong> ${Object.values(country.languages).join(", ")}</p>
      `;
      resultDiv.innerHTML = html;
    })
    .catch(error => {
      errorDiv.textContent = error.message;
    });
}
