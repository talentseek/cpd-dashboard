// src/components/WhatIfScenarios.tsx
"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { LineChart } from "@/components/ui/chart";
import styles from "@/components/styles/WhatIfScenarios.module.css";

const generateRandomData = (initial: number, length: number) => {
  let value = initial;
  return Array.from({ length }, () => {
    const change = (Math.random() - 0.5) * 20;
    value = value + change;
    if (value < 0) value = 0;
    return Number(value.toFixed(2));
  });
};

const WhatIfScenarios: React.FC = () => {
  const [marketGrowth, setMarketGrowth] = useState(50);
  const [operationalEfficiency, setOperationalEfficiency] = useState(50);

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Market Growth",
        data: generateRandomData(marketGrowth, labels.length),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Operational Efficiency",
        data: generateRandomData(operationalEfficiency, labels.length),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h3 className={styles.title}>Scenario Parameters</h3>
        <div className={styles.parameters}>
          <div className={styles.parameter}>
            <label className={styles.label}>Market Growth</label>
            <Slider
              value={[marketGrowth]}
              onValueChange={(value) => setMarketGrowth(value[0])}
              max={100}
              step={1}
            />
            <span className={styles.value}>{marketGrowth}%</span>
          </div>
          <div className={styles.parameter}>
            <label className={styles.label}>Operational Efficiency</label>
            <Slider
              value={[operationalEfficiency]}
              onValueChange={(value) => setOperationalEfficiency(value[0])}
              max={100}
              step={1}
            />
            <span className={styles.value}>{operationalEfficiency}%</span>
          </div>
        </div>
      </Card>
      <Card className={styles.card}>
        <h3 className={styles.title}>Projected Outcome</h3>
        <div className={styles.chartContainer}>
          <LineChart data={chartData} />
        </div>
      </Card>
    </div>
  );
};

export default WhatIfScenarios;