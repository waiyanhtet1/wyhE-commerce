import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import "./widget.scss";

export default function Widget({ type }) {
  const { data } = useFetch("/orders/month/income");
  const listData = data.sort((a, b) => {
    return a._id - b._id;
  });

  const diff = (listData[1]?.total * 100) / listData[0]?.total - 100;

  let value;
  switch (type) {
    case "revenue":
      value = {
        title: "Revenue",
        price: listData[1]?.total,
        income: diff,
      };
      break;
    case "sale":
      value = {
        title: "Sales (Static Data)",
        price: "4,454",
        income: -1.4,
      };
      break;
    case "cost":
      value = {
        title: "Cost (Static Data)",
        price: "2,023",
        income: +2.1,
      };
      break;
    default:
      break;
  }

  // console.log((data[1]?.total * 100) / data[0]?.total - 100);

  return (
    <div className="widget">
      <h2 className="widgetTitle">{value.title}</h2>
      <div className="widgetPricecontainer">
        <h1 className="widgetPrice">$ {value.price}</h1>
        <div className="widgetIconme">
          <span>{Math.floor(value.income)} %</span>
          {value.income < 0 ? (
            <ArrowDownward color="error" />
          ) : (
            <ArrowUpward color="success" />
          )}
        </div>
      </div>
      <h4 className="widgetSubtext">Compared to last month</h4>
    </div>
  );
}
