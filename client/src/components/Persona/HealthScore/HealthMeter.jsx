import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./HealthMeter.css";

const HealthMeter = ({ value }) => {
  const data = [
    { name: "Score", value: value },
    { name: "Remaining", value: 100 - value },
  ];

  const centerX = 200;
  const centerY = 160;
  const radius = 100;
  const angleDeg = 180 - value * 1.8;
  const angleRad = (Math.PI / 180) * angleDeg;

  const needleLength = radius - 10;
  const needleX = centerX + needleLength * Math.cos(angleRad);
  const needleY = centerY - needleLength * Math.sin(angleRad);

  // Determine arrow color and label
  let arrowColor = "#FF0000";
  let label = "Risky";

  if (value >= 95) {
    arrowColor = "#006400";
    label = "Legendary";
  } else if (value >= 85) {
    arrowColor = "#32CD32";
    label = "Excellent";
  } else if (value >= 70) {
    arrowColor = "#FFD700";
    label = "Good";
  } else if (value >= 55) {
    arrowColor = "#FFA500";
    label = "Fair";
  } else if (value >= 40) {
    arrowColor = "#FF8C00";
    label = "Poor";
  }

  const gradientData = Array.from({ length: 20 }, (_, i) => ({
    name: `Segment ${i}`,
    value: 5,
  }));

  const gradientColors = [
    "#FF0000",
    "#FF1100",
    "#FF2200",
    "#FF3300",
    "#FF4500",
    "#FF6000",
    "#FF7500",
    "#FF8C00",
    "#FFA500",
    "#FFC300",
    "#FFD700",
    "#E0FF00",
    "#BFFF00",
    "#90EE90",
    "#66CD66",
    "#32CD32",
    "#2E8B57",
    "#228B22",
    "#006400",
    "#004d00",
  ];

  return (
    <div className="health-meter-container">
      <ResponsiveContainer width={400} height={200}>
        <PieChart>
          <Pie
            data={gradientData}
            cx={centerX}
            cy={centerY}
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
            stroke="none"
          >
            {gradientData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={gradientColors[index]} />
            ))}
          </Pie>
          <svg>
            <line
              x1={centerX}
              y1={centerY}
              x2={needleX}
              y2={needleY}
              stroke={arrowColor}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx={centerX} cy={centerY} r={6} fill={arrowColor} />
          </svg>
        </PieChart>
      </ResponsiveContainer>
      <div className="health-meter-value" style={{ color: arrowColor }}>
        Health Score: {value}/100 - {label}
      </div>
    </div>
  );
};

export default HealthMeter;
