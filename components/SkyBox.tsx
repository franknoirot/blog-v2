import Head from "next/head"
import { FormEvent, useEffect, useRef, useState } from "react"

const DEFAULT_LAT = 40.712776

interface ISkyBoxProps {
    className?: string,
}

export default function SkyBox({ className = 'inset-0 bg-red-100' }) {
    const [time, setTime] = useState(new Date())
    const [h, setH] = useState(hourAngle(time))
    useEffect(() => {
        setH(hourAngle(time)) 
    }, [time])
    const sD = solarDeclination(ordinalDay(time))
    const zenith = solarZenithAngle(h, sD, DEFAULT_LAT)
    const azimuth = solarAzimuthAngle(h, sD, zenith, DEFAULT_LAT)

    function onChange(e: FormEvent<HTMLInputElement>) {
        e.preventDefault()
        e.persist()
        const hours = (Math.floor(e.target.value / 60))
        const minutes = e.target.value % 60
        const newTime = new Date(`2022-06-24T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)

        console.log({ h, time, sD, zenith, azimuth })

        setTime(newTime)
    }

    return (<>
        <Head>
            <style>
                --time: {time.getHours() * 60 + time.getMinutes()}
            </style>
        </Head>
        <div className="fixed inset-0 -z-50" style={{background: `radial-gradient(circle at ${(azimuth * 100).toString().padStart(2, '0')}% ${((1 - zenith) * 100).toFixed(1)}%, blue, red)`}}>
        </div>
        <input onChange={onChange} type="range" min={0} max={1440} step={1} className="fixed z-50 p-4 bg-green-100 border top-6 right-6 rounded-xl border-green" />
        </>)
}

// function getPositionOfSun()
// someday I'll do something this extra...🌇

const rad = Math.PI / 180

function solarAzimuthAngle(hourAngle: number, solarDeclination: number, solarZenithAngle: number, latitude: number): number {
    const { abs, acos, sin, cos } = Math
    return acos(abs(
        (
            (sin(solarDeclination * rad) * cos(latitude * rad)) - (cos(hourAngle * rad) * cos(solarDeclination * rad) * sin(latitude * rad))
        ) / sin(solarZenithAngle * rad)
    ))
}

function solarZenithAngle(hourAngle: number, solarDeclination: number, latitude: number = DEFAULT_LAT): number {
    const { sin, cos } = Math
    return sin(latitude * rad) * sin(solarDeclination * rad) + cos(latitude * rad) * cos(solarDeclination * rad) * cos(hourAngle *rad)
}

function solarDeclination(ordinalDay: number): number {
    const { asin, cos, sin} = Math
    return -1*asin(0.39779 * cos(0.98565 * (ordinalDay + 10) + 1.914 * sin(0.98565 * (ordinalDay - 2))))
}

function ordinalDay(date: Date): number {
    return monthLengths.slice(date.getMonth()).reduce((num, acc) => num + acc) + date.getDate() + date.getHours() / 24
}

function hourAngle(date: Date): number {
    return 15 * (date.getHours() + date.getMinutes() / 60 - 12)
}

const monthLengths = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
]