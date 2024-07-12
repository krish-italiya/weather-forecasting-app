import React, { useEffect, useState } from 'react'
import { WiCloudyGusts, WiHumidity } from 'weather-icons-react'
import { motion } from 'framer-motion'

const Weather = ({ response, reference }) => {
    const [data, setData] = useState([])
    const [isMph, setIsMph] = useState(false)
    const [isCelcius, setIsCelcius] = useState(true)
    const [city, setCity] = useState(null)
    const [tomorrow, setTomorrow] = useState([])
    const [overmorrow, setOvermorrow] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        // setIsLoading(false)
        const data = JSON.parse(response)
        const weather = data.current
        const location = data.location
        console.log(weather)
        const detail = [{
            icon: weather.condition.icon,
            text: weather.condition.text,
            isDay: weather.is_day,
            humidity: weather.humidity,
            temp_c: weather.temp_c,
            temp_f: weather.temp_f,
            wind_degree: weather.wind_degree,
            wind_speed_kph: weather.wind_kph,
            wind_speed_mph: weather.wind_mph,
            city_name: location.name,
            region: location.region,
            country: location.country,
            time_zone: location.tz_id
        }]
        setCity(location.name)
        setData(detail)

        const getLocation = async (cityName) => {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${cityName}&aqi=yes&days=3`
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Headers': "*"
                }
            })
            const json = await res.json()
            const tomorrowData = json.forecast.forecastday[1]
            const overmorrowData = json.forecast.forecastday[2]
            let arr = []
            let arr1 = []
            for (let i = 0; i < 24; i += 4) {
                arr.push(tomorrowData.hour[i])
                arr1.push(overmorrowData.hour[i])
            }
            arr.push(tomorrowData.hour[23])
            arr1.push(overmorrowData.hour[23])
            setTomorrow(arr)
            setOvermorrow(arr1)
            console.log("tomorrow data")
            setIsLoading(true)
        }
        getLocation(city)
    }, [])

    return (
        <>{isLoading &&
            <div ref={reference} className='card-container'>
                {data.length > 0 && (
                    <motion.div drag dragConstraints={reference} whileDrag={{ scale: "1.1" }} className='weather-card'>
                        <div className="title">
                            {data[0].city_name},
                            {data[0].region},
                            {data[0].country}
                        </div>
                        <div className='day-night'>
                            {data[0].text} {data[0].isDay === 0 && "Night"}
                            <img src={`${data[0].icon}`} alt="" />
                        </div>
                        <div className="temp" style={{ cursor: 'pointer' }} onClick={() => setIsCelcius(prev => !prev)}>
                            {isCelcius ? (
                                <>
                                    {data[0].temp_c}<sup className='degree'>0</sup>C
                                </>
                            ) : (
                                <>
                                    {data[0].temp_f}<sup className='degree'>0</sup>F
                                </>
                            )}
                        </div>
                        <div className='wind-humid'>
                            <div className="humidity">
                                <WiHumidity />
                                {/* <p>Humidity:</p> */}
                                {data[0].humidity}
                            </div>
                            <div className="wind" style={{ cursor: "pointer" }} onClick={() => setIsMph(prev => !prev)}>
                                {isMph ? (
                                    <>
                                        <WiCloudyGusts />
                                        {data[0].wind_speed_mph + "m/h"}
                                    </>
                                ) : (

                                    <>
                                        <WiCloudyGusts />
                                        {data[0].wind_speed_kph + "km/h"}
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
                <div className='forecast-card'>
                    <motion.div drag dragConstraints={reference} whileDrag={{ scale: "1.1" }} className="card">
                        <div className="heading">Forecast for {tomorrow[0].time.split(' ')[0]}</div>
                        <div className="forecast">
                            {tomorrow.length > 0 && tomorrow.map((tom, i) => (
                                <div className='inner-card' key={i}  >
                                    <div>{tom.time.split(' ')[1]}</div>
                                    <div>
                                        <p>{tom.condition.text}</p>
                                        <img src={`${tom.condition.icon}`} alt="" />
                                    </div>
                                    <div >
                                        <p style={{ fontSize: "xx-large" }}>{tom.temp_c}</p><sup className='degree'>0</sup><p style={{ fontSize: "xx-large" }}>C</p>
                                    </div>
                                    <div className='wind-humid'>
                                        <div>
                                            <WiHumidity />
                                            {tom.humidity}
                                        </div>
                                        <div>
                                            <WiCloudyGusts />
                                            {tom.wind_kph}km/h
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div drag dragConstraints={reference} whileDrag={{ scale: "1.1" }} className="card">
                        <div className="heading">Forecast for {overmorrow[0].time.split(' ')[0]}</div>
                        <div className="forecast">
                            {overmorrow.length > 0 && overmorrow.map((tom, i) => (
                                <div className='inner-card' key={i}>
                                    <div>{tom.time.split(' ')[1]}</div>
                                    <div>
                                        <p>{tom.condition.text}</p>
                                        <img src={`${tom.condition.icon}`} alt="" />
                                    </div>
                                    <div >
                                        <p style={{ fontSize: "xx-large" }}>{tom.temp_c}</p><sup className='degree'>0</sup><p style={{ fontSize: "xx-large" }}>C</p>
                                    </div>
                                    <div className='wind-humid'>
                                        <div>
                                            <WiHumidity />
                                            {tom.humidity}
                                        </div>
                                        <div>
                                            <WiCloudyGusts />
                                            {tom.wind_kph}km/h
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </motion.div>
                </div>

            </div>}
        </>
    )
}

export default Weather