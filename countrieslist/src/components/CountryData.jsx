function CountryData({ country }) {
    return (
        <div className="country-data">
            <div className="country-name">{country.name.common.toUpperCase()}</div>
            <br />
            <div>
                <img src={country.flags.svg} alt={country.flags.alt} className="country-flag"/>
            </div>
            <p>Capital(s): <strong>{country.capital.join(', ')}</strong></p>
            <p>Population: <strong>{country.population.toLocaleString('de-DE')}</strong></p>
            <p>Area: <strong>{country.area.toLocaleString('de-DE')}</strong> km²</p>
            <p>Currency: 
                <strong>
                    &nbsp;{country.currencies[Object.keys(country.currencies)[0]].name}
                    <span className="no-wrap">
                        &nbsp;({Object.keys(country.currencies)[0]} |
                        &nbsp;{country.currencies[Object.keys(country.currencies)[0]].symbol})
                    </span>
                </strong>
            </p>
            <p>Region: <strong>{country.region}</strong></p>
            <p>Subregion: <strong>{country.subregion}</strong></p>
            <p>Borders: <strong>{country.borders?.length ? country.borders.join(', ') : "None"}</strong></p>
            <p><strong>Languages:</strong></p>
            <ul className="languages-list">
                {Object.entries(country.languages).map(([key, value]) => {
                    return <li key={key}>{value}</li>
                })}
            </ul>
        </div>
    );
}

export default CountryData;