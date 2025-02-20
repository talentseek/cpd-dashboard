import type React from "react"

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#00334B]" />
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#c4d0ff] opacity-20 animate-float"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground

