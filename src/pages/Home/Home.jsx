import Navbar from "../../components/Navbar/Navbar";
import Chart from "../../components/Chart/Chart";
import SideBar from "../../components/sidebar/SideBar";
import Widget from "../../components/Widget/Widget";
import "./home.scss";
import JoinMembers from "../../components/JoinMembers/JoinMembers";
import LastTrans from "../../components/LastTran/LastTrans";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />

        <div className="mainWrapper">
          <div className="widgetContainer">
            <Widget type="revenue" />
            <Widget type="sale" />
            <Widget type="cost" />
          </div>
          <div className="charts">
            <Chart />
          </div>

          <div className="homeUserInformation">
            <JoinMembers />
            <LastTrans />
          </div>
        </div>
      </div>
    </>
  );
}
