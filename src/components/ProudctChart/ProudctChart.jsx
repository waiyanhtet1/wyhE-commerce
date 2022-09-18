import "./productChart.scss";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";

// const data = [
//   { name: "Oct", value: 300 },
//   { name: "Nov", value: 200 },
//   { name: "Dec", value: 500 },
// ];

export default function ProudctChart({ productId }) {
  const [productStats, setProductStats] = useState([]);

  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`/orders/month/income?${productId}`);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {}
    };
    getStats();
  }, []);

  return (
    <div className="proudctChart">
      <div className="chart">
        <div className="title">Sales Performance</div>
        <ResponsiveContainer width="100%" aspect={3 / 1}>
          <LineChart
            width={430}
            height={250}
            data={productStats}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
