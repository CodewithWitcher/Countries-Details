const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const inputBox = document.querySelector('.search-container')


const themeChanger = document.querySelector('.theme-changer')
const body = document.body

let allCountriesData

fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
        renderCountries(data)
        allCountriesData = data
    })

filterByRegion.addEventListener('change', (e) => {
    fetch('./data.json')
        .then((res) => res.json())
        .then((data) => {
            const regionSelect = data.filter(item => item.region === filterByRegion.value);
            renderCountries(regionSelect)
        })
})

function renderCountries(data) {
    countriesContainer.innerHTML = ''
    data.forEach((country) => {
        // console.log(country.borders)
        const countryCard = document.createElement('a')
        countryCard.classList.add('country-card')
        countryCard.href=`/country.html?name=${country.name}`
        countryCard.innerHTML = `
             <img src="${country.flags.svg}" alt="${country.name}">
               <div class="card-text">
                   <h3 class="card-titel">${country.name}</h3>
                   <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                   <p><b>Region: </b>${country.region}</p>
                   <p><b>Capital: </b>${country.capital}</p>
               </div>
    `
        countriesContainer.append(countryCard)
    })
}
searchInput.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)

})
if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark")
    inputBox.classList.add('dark')
}

themeChanger.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove("dark");
        inputBox.classList.remove('dark')
        localStorage.setItem("darkMode", "disabled")
    }
    else {
        body.classList.add("dark")
        inputBox.classList.add('dark')
        localStorage.setItem("darkMode", "enabled")
    }
})

