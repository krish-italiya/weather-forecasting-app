import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import MainBackground from './components/MainBackground'
import Select from 'react-select';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';



const App = () => {
  const [city, setCity] = useState('')
  const [current, setCurrent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState(null)
  const [isDay, setIsDay] = useState(0)
  const ref = useRef(null)
  const getLiveLocation = async (lat, long) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${lat + "," + long}`
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      }
    })
    const json = await res.json()
    const location = json.location
    const curr = json.current
    setDetails(JSON.stringify(json))
    setCurrent(curr.condition.text)
    setIsDay(curr.is_day)
    setCity(location.name)
    setIsLoading(false)
  }
  const getLocation = async (cityName) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=${cityName}&aqi=yes`
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      }
    })
    const json = await res.json()
    const location = json.location
    const curr = json.current
    // console.log(json)
    setDetails(JSON.stringify(json))
    setIsDay(curr.is_day)
    setCurrent(curr.condition.text)
    setCity(location.name)
    setIsLoading(false)
  }
  useEffect(() => {
    setIsLoading(true)
    if (city) {
      getLocation(city)
    }
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        // console.log(lat)
        // console.log(long)
        // console.log()
        getLiveLocation(lat, long)
      }, (err) => {
        console.log("Something went Wrong")
      })
    }
    else {
      setCity("surat")
    }
  }, [city])


  return (
    <>
      {isLoading === false && (
        <>
          <SearchBar getCity={setCity} />
          <MainBackground current={current === "" ? "Cloudy" : current} isDay={isDay} />
          <Weather reference={ref} response={details} />
        </>
      )}
    </>
  )
}

export default App