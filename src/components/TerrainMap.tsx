import type React from "react"
import { TrendingUp, TrendingDown, Zap, Shield } from "lucide-react"
import styles from "@/components/styles/TerrainMap.module.css"

const TerrainMap: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>Challenges</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <TrendingDown className={styles.iconRed} />
            <span>Market volatility</span>
          </li>
          <li className={styles.item}>
            <Shield className={styles.iconYellow} />
            <span>Regulatory compliance</span>
          </li>
          <li className={styles.item}>
            <Zap className={styles.iconBlue} />
            <span>Digital transformation</span>
          </li>
        </ul>
      </div>
      <div className={styles.card}>
        <h3 className={styles.title}>Opportunities</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            <TrendingUp className={styles.iconGreen} />
            <span>Data-driven decision making</span>
          </li>
          <li className={styles.item}>
            <Zap className={styles.iconPurple} />
            <span>AI and machine learning integration</span>
          </li>
          <li className={styles.item}>
            <Shield className={styles.iconBlue} />
            <span>Sustainable finance initiatives</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TerrainMap