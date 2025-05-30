import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function WalletRadarChart({ processedData }) {
  const {
    ageDays,
    uniqueTokens,
    safeContracts,
    avgTxPerMonth,
    recentTxnsCount,
  } = processedData;

  // Scoring logic
  const rawScores = {
    ageScore:
      ageDays > 365 * 10
        ? 25
        : ageDays > 365 * 5
        ? 24
        : ageDays > 365 * 4
        ? 23
        : ageDays > 365 * 3
        ? 22
        : ageDays > 365 * 2
        ? 21
        : ageDays > 365
        ? 20
        : ageDays > 180
        ? 17
        : ageDays > 90
        ? 15
        : 5,

    diversityScore: uniqueTokens >= 20 ? 20 : uniqueTokens,

    protocolScore: safeContracts >= 3 ? 20 : safeContracts >= 2 ? 15 : 10,

    txnScore: avgTxPerMonth > 20 ? 20 : avgTxPerMonth > 10 ? 15 : 10,

    recentActivityScore:
      recentTxnsCount > 50
        ? 10
        : recentTxnsCount > 20
        ? 5
        : recentTxnsCount < 5
        ? -5
        : 0,
  };

  const maxScores = {
    ageScore: 25,
    diversityScore: 20,
    protocolScore: 20,
    txnScore: 20,
    recentActivityScore: 10,
  };

  const clamp = (value, max) => Math.max(0, Math.min(value, max));

  const chartData = [
    {
      metric: "Wallet Age",
      percent: Math.round(
        (clamp(rawScores.ageScore, maxScores.ageScore) / maxScores.ageScore) *
          100
      ),
    },
    {
      metric: "Token Diversity",
      percent: Math.round(
        (clamp(rawScores.diversityScore, maxScores.diversityScore) /
          maxScores.diversityScore) *
          100
      ),
    },
    {
      metric: "Safe Protocols",
      percent: Math.round(
        (clamp(rawScores.protocolScore, maxScores.protocolScore) /
          maxScores.protocolScore) *
          100
      ),
    },
    {
      metric: "Txns/Month",
      percent: Math.round(
        (clamp(rawScores.txnScore, maxScores.txnScore) / maxScores.txnScore) *
          100
      ),
    },
    {
      metric: "Recent Activity",
      percent: Math.round(
        (clamp(rawScores.recentActivityScore, maxScores.recentActivityScore) /
          maxScores.recentActivityScore) *
          100
      ),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <RadarChart outerRadius="80%" data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" />
        <PolarRadiusAxis
          angle={50}
          domain={[0, 100]}
          tickFormatter={(t) => `${t}%`}
        />
        <Tooltip
          formatter={(value, name, props) => [
            `${value}%`,
            props.payload.metric,
          ]}
        />
        <Radar
          dataKey="percent"
          stroke="#00bcd4"
          fill="#00bcd4"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
