import React, { useEffect, useState } from 'react'
import rainyVideo from '../assets/rain.mp4'
import cloudyVideo from "../assets/cloudy.mp4"
import sunnyVideo from "../assets/sunny.mp4"
import nightRainyVideo from "../assets/night_rainy.mp4"
import nightCloudyVideo from "../assets/night_cloudy.mp4"
import nightClearVideo from "../assets/night_clear.mp4"

const MainBackground = ({ current, isDay }) => {
    const [video, setVideo] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        console.log("Current background : ", current)
        if (isDay === 1) {
            if (current.includes("Sunny") || current.includes("Clear")) {
                setVideo(sunnyVideo)
            }
            else if (current.includes("rain") || current.includes("rainy") || current.includes("Rain") || current.includes("Rainy")) {
                setVideo(rainyVideo)
            }
            else {
                setVideo(cloudyVideo)
            }
        }
        else {
            if (current.includes("sunny") || current.includes("Clear")) {
                setVideo(nightClearVideo)
            }
            else if (current.includes("rain") || current.includes("rainy") || current.includes("Rain") || current.includes("Rainy")) {
                setVideo(nightRainyVideo)
            }
            else {
                setVideo(nightCloudyVideo)
            }

        }
        setIsLoading(false)
    },)

    return (
        <>
            {isLoading === false && (
                <video autoPlay loop muted style={{ position: "fixed", zIndex: "-5", width: "100%" }}>
                    {video && <source src={video} type='video/mp4' />}
                </video>
            )}
        </>
    )
}

export default MainBackground