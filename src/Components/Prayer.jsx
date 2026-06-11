import React from 'react'

export default function Prayer({ name, time }) {
  return (
    <div className="prayer">
        <p className="name-prayer">{name}</p>
        <p className="time-prayer">{time}</p>
    </div>
  )
}
