import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Dot,
} from 'recharts';

const CustomDot = (props) => {
  const { cx, cy, value, payload, activePoint, height } = props;
  const isHighlighted = payload && activePoint && payload.period === activePoint.period;
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

const TransactionTimelineChart = ({data, setSelectedColumn}) => {
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
    setSelectedColumn(point);
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
            dataKey="period"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#777' }}
            padding={{ left: 10, right: 10 }}
          />
          {/* Remove YAxis */}
          <Line
            type="monotone"
            dataKey="amount"
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