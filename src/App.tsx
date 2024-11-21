import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [location, setLocation] = useState<string>("")
    const [city, setCity] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const [restricted, setRestricted] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ipinfo.io/json?token=2ff4694e0cc665');
                const {country} = response.data;
                const {city} = response.data;
                if (response.status == 403) {
                    setCity("Iran")
                    setLocation("IR");
                    setRestricted(true);
                } else {
                    setCity(city);
                    setLocation(country);
                    setRestricted(country.toLowerCase() == "ir")
                }
            } catch (error) {
                console.error(error);
                setCity("Unknown")
                setRestricted(true);
                setRestricted(true);
                setLoading(false);

            }
        };
        fetchData();
    })

    const getCountryFlag = (countryCode: string) => {
        return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
    };
    return (
        <>

            <h2>Ip Checker</h2>
            {location ?
                (<p>your location is : <strong>{city}</strong>
                    <img
                        src={getCountryFlag(location)}
                        alt={location}
                        className="flag"
                    />
                </p>) :
                (loading ? (<p>Loading Location</p>) : (<p>Location not found</p>))
            }

            {!restricted ? (<div className="buttons">
                    <button
                        className="action-button"
                        disabled={restricted}
                        onClick={() => window.open('https://www.fiverr.com/', '_blank')}>
                        Fiverr
                    </button>

                    <button
                        className="action-button"
                        disabled={restricted}
                        onClick={() => window.open('https://www.upwork.com', '_blank')}>
                        Upwork
                    </button>

                    <button
                        className="action-button"
                        disabled={restricted}
                        onClick={() => window.open('https://www.freelancer.com', '_blank')}>
                        Freelancer
                    </button>
                </div>
            ) : (<p>Nothing to show</p>)}
        </>
    )
}

export default App
