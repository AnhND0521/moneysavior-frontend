import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Dot,
} from 'recharts';

const data = [
  { date: '01/05', value: 10000 },
  { date: '02/05', value: 12000 },
  { date: '03/05', value: 15000 },
  { date: '04/05', value: 18000 },
  { date: '05/05', value: 14000 },
  { date: '06/05', value: 16000 },
  { date: '07/05', value: 13000 },
  { date: '08/05', value: 17000 },
  { date: '09/05', value: 19000 },
  { date: '10/05', value: 15500 },
  { date: '11/05', value: 12500 },
  { date: '12/05', value: 14500 },
  { date: '13/05', value: 16500 },
  { date: '14/05', value: 18500 },
  { date: '15/05', value: 15000 },
  { date: '16/05', value: 17000 },
  { date: '17/05', value: 19500 },
  { date: '18/05', value: 16000 },
  { date: '19/05', value: 13500 },
  { date: '20/05', value: 15500 },
];

const CustomDot = (props) => {
  const { cx, cy, value, payload, activePoint, height } = props;
  const isHighlighted = payload && activePoint && payload.date === activePoint.date;
  const isTopHalf = cy < height / 2;
  const textY = isTopHalf ? cy + 25 : cy - 35;
  const arrowPoints = isTopHalf ? `0,0 5,5 -5,5` : `0,0 5,-5 -5,-5`;
  const rectY = isTopHalf ? 10 : -35;

  if (isHighlighted) {
    return (
      <>
        <circle cx={cx} cy={cy} r={8} fill="#38ada9" />
        <g transform={`translate(${cx}, ${textY - (isTopHalf ? 5 : -15)})`}>
          <path
            d={`M${arrowPoints} Z`}
            fill="#ffffff"
            stroke="#38ada9"
            strokeWidth={1}
          />
          <text x="0" y={isTopHalf ? rectY + 14 : rectY + 14} textAnchor="middle" dominantBaseline="middle" fill="#38ada9" fontSize={12} fontWeight="bold">
            {value.toLocaleString()} ₫
          </text>
        </g>
      </>
    );
  }

  return <circle cx={cx} cy={cy} r={4} fill="#38ada9" />;
};

const TransactionTimelineChart = () => {
  const [activePoint, setActivePoint] = useState(null);
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      chartContainerRef.current.scrollLeft = chartContainerRef.current.scrollWidth;
    }
  }, [data]);

  const handleMouseEnter = (point) => {
    setActivePoint(point);
  };

  const handleMouseLeave = () => {
    setActivePoint(null);
  };

  const handleClick = (point) => {
    setActivePoint(point);
  };

  return (
    <div style={{ overflowX: 'auto' }} ref={chartContainerRef}>
      <ResponsiveContainer width={600} height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
          onMouseMove={(o) => {
            if (o && o.activePayload && o.activePayload.length > 0) {
              handleMouseEnter(o.activePayload[0].payload);
            } else {
              handleMouseLeave();
            }
          }}
          onMouseLeave={handleMouseLeave}
          onClick={(o) => {
            if (o && o.activePayload && o.activePayload.length > 0) {
              handleClick(o.activePayload[0].payload);
            } else {
              handleClick(null);
            }
          }}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#777' }}
            padding={{ left: 10, right: 10 }}
          />
          {/* Remove YAxis */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#38ada9"
            strokeWidth={2}
            dot={(props) => <CustomDot {...props} activePoint={activePoint} />}
            activeDot={null}
            fill="rgba(56, 173, 169, 0.2)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionTimelineChart;