import { useEffect, useState } from 'react';

import AmrIsmail from './Components/AmrIsmail';
import Prayer from './Components/Prayer';

function App() {

  const [prayerTimes, setPrayerTimes] = useState({})
  const [dateTime, setDateTime] = useState("")
  const [city, setCity] = useState("Cairo")

  const cities = [
    {name : "Cairo", value : "Cairo"},
    {name : "Alexandria", value : "Alexandria"},
    {name : "Giza", value : "Giza"},
    {name : "Mansura", value : "Mansura"},
    {name : "Aswan", value : "Aswan"},
    {name : "Luxor", value : "Luxor"},
  ]

  useEffect(() => {

    if (!city) return

    const fetchPrayerTime = async () => {
      try {
        const today = new Date()
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${city}&country=EG`)
        const dataPrayer = await response.json()

        setPrayerTimes(dataPrayer.data.timings)
        setDateTime(dataPrayer.data.date.gregorian.date)
        
        console.log(dataPrayer)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPrayerTime()

  }, [city])

  const formatTimes = (time) => {
    if (!time) return "00:00"

    let [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    hours = hours % 12 || 12

    return `${hours} : ${minutes < 10 ? "0" + minutes : minutes} ${period}`
  }

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>city</h3>
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              {cities.map((cityItem) => (
                <option key={cityItem.value} value={cityItem.value}>
                  {cityItem.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>Date</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name="Fajr" time={formatTimes(prayerTimes.Fajr)} />
        <Prayer name="Dhuhr" time={formatTimes(prayerTimes.Dhuhr)} />
        <Prayer name="Asr" time={formatTimes(prayerTimes.Asr)} />
        <Prayer name="Maghrib" time={formatTimes(prayerTimes.Maghrib)} />
        <Prayer name="Isha" time={formatTimes(prayerTimes.Isha)} />
      </div>
      <AmrIsmail />
    </section>
  )
}

export default App