"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<number>(0)

  useEffect(() => {
    const startTime = Date.now()
    const endValue = value

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeProgress = progress * (2 - progress) // easeOutQuad
      const currentCount = Math.floor(easeProgress * endValue)

      if (currentCount !== countRef.current) {
        setCount(currentCount)
        countRef.current = currentCount
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [value, duration])

  return (
    <span className="text-2xl font-bold text-[#9ecc3b]">
      {count}
      {suffix}
    </span>
  )
}

export default AnimatedCounter

