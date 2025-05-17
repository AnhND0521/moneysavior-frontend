import React from 'react';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';

const CategoryChart = (props) => {
  const categorySummary = props.categorySummary;
  console.log(categorySummary);
  const data = categorySummary.map(category => {
    return {
      name: category.categoryName,
      value: category.totalAmount,
    }
  });

  const colors = [
    "#7678F5", "#DA4348", "#FFA216", "#4FBE56", "#DE62DE"
  ]

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const name = data[index].name;

    return (
      <>
        {percent * 100 >= 5 &&
          <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
            <tspan x={x} dy="-0.6em">{name}</tspan>
            <tspan x={x} dy="1.2em">{`${(percent * 100).toFixed(0)}%`}</tspan>
          </text>
        }
      </>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={240} height={240}>
        <Pie 
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={30}
          outerRadius={120}
          startAngle={90}
          labelLine={false}
          label={renderCustomizedLabel}
          endAngle={-270}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CategoryChart
