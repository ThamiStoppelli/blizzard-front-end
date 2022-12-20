import "./style.css";
import {
  LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, YAxis, Legend, 
} from "recharts";

export default function Chart({ title, data, dataKey,dataKey2, grid }) {

  return (
    <div className="chart">
      <span className="chartTitle">{title}</span>
      <ResponsiveContainer width="100%" aspect={3 / 1} className="chartInside" >
        <LineChart  data={data} className="chartFont">
          <XAxis dataKey="Hour" stroke="#6C6C6C" />
          <YAxis unit="khw"/>
          <Line type="monotone" dataKey={dataKey} stroke="#14B17D"  strokeWidth={"4px"}  />
          <Line type="monotone" dataKey={dataKey2} stroke="#FEA307" strokeWidth={"4px"} />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf"  />}
          <Legend verticalAlign="top" width={420} height={36} iconType='circle' className="chartLines" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
