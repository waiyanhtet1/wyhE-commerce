import "./chart.scss";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

// const data = [
//   {
//     name: "Janu",
//     value: 200,
//   },

//   {
//     name: "Feb",
//     value: 300,
//   },

//   {
//     name: "March",
//     value: 500,
//   },

//   {
//     name: "April",
//     value: 300,
//   },
//   {
//     name: "May",
//     value: 400,
//   },

//   {
//     name: "June",
//     value: 700,
//   },

//   {
//     name: "July",
//     value: 300,
//   },

//   {
//     name: "Agust",
//     value: 500,
//   },

//   {
//     name: "Sep",
//     value: 600,
//   },

//   {
//     name: "Oct",
//     value: 100,
//   },

//   {
//     name: "Nov",
//     value: 400,
//   },
//   {
//     name: "Dec",
//     value: 600,
//   },
// ];

export default function Chart() {
  const [userStats, setUserStats] = useState([]);

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
        const res = await userRequest.get("/users/stats");
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (error) {}
    };
    getStats();
  }, []);

  return (
    <div className="chart">
      <div className="title">Active User Details</div>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          width={430}
          height={250}
          data={userStats}
          margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />

          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Active User" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
