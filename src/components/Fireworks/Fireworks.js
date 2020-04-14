import { Fireworks } from 'fireworks/lib/react'
import React from 'react'

const FireworksComponent = () => {
  // function to create a 'range' in js
  const range = n => [...new Array(n)]
  const numOfFireworks = 7
  const fwHTML = range(numOfFireworks).map((num, i) => {
    const fxProps = {
      // one explosion per
      count: 1,
      // 500 ms between each round
      interval: 500,
      colors: ['#cc3333', '#4CAF50', '#81C784', '#3772FF', '#F038FF', '#E2EF70', '#70E4EF'],
      calc: props => ({
        ...props,
        // the can appear anywhere on x axis and 200 above bottom of window
        x: Math.floor(Math.random() * Math.floor(window.innerWidth)),
        y: Math.floor(Math.random() * Math.floor(window.innerHeight)) - 200
      })
    }
    return <Fireworks key={i} {...fxProps}></Fireworks>
  })
  return (
    <div>
      {fwHTML}
    </div>
  )
}

export default FireworksComponent
