const countryName = (new URLSearchParams(location.search).get('name'))
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.details-text-conatiner h1')
const nativeName = document.querySelector('.Native-Name')
const population = document.querySelector('.Population')
const region = document.querySelector('.Region')
const subRegion = document.querySelector('.Sub-Region')
const capital = document.querySelector('.Capital')
const topLevelDomain = document.querySelector('.Top-Level-Domain')
const currencies = document.querySelector('.Currencies')
const languages = document.querySelector('.Languages')
const bordersCountry = document.querySelector('.border-countries')

const themeChanger = document.querySelector('.theme-changer')
const body = document.body

fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {

        const countryData = data.find(item => item.name === countryName);

        flagImage.src = countryData.flags.svg;
        countryNameH1.innerText = countryData.name
        nativeName.innerText = countryData.nativeName
        population.innerText = countryData.population
        region.innerText = countryData.region
        topLevelDomain.innerText = countryData.topLevelDomain
        if (countryData.capital) {
            capital.innerText = countryData.capital
        }
        if (countryData.subregion) {
            subRegion.innerText = countryData.subregion
        }
        if (countryData.currencies) {
            currencies.innerText = (Object.values(countryData.currencies).map((currency) => currency.name).join(','))
        }
        if (countryData.languages) {
            languages.innerText = (Object.values(countryData.languages).map((currency) => currency.name).join(','))
        }
        // console.log(countryData.borders)

        if (countryData.borders) {
            countryData.borders.forEach((border) => {
                // Search for the country with the border code
                const borderCountry = data.find(item => item.alpha3Code === border);

                // Check if the country was found
                if (borderCountry) {

                    const borderCountryTag = document.createElement('a');
                    borderCountryTag.innerText = borderCountry.name;
                    // console.log(borderCountryTag)
                    borderCountryTag.href = `country.html?name=${borderCountry.name}`;
                    bordersCountry.append(borderCountryTag);
                } else {
                    console.log(`Country not found for border code: ${border}`);
                }
            });
        }
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

