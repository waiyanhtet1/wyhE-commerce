import { Visibility } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import useFetch from "../../hook/useFetch";
import "./joinmember.scss";
import { Link } from "react-router-dom";

export default function JoinMembers() {
  const { data } = useFetch("/users?new=true");
  return (
    <div className="joinMembers">
      <h1 className="joinTitle">New Join Members</h1>

      <ul className="joinList">
        {data.map((d) => (
          <li className="joinItem" key={d._id}>
            <div className="joinUser">
              <Avatar
                sx={{ width: 35, height: 35 }}
                alt={d.username}
                src={d.image || "fsfj"}
              />
              <div>
                <span className="joinName">{d.username}</span> <br />
                <span className="joinPosition">{d.email}</span>
              </div>
            </div>
            <Link to={`/users/${d._id}`} className="joinButton">
              <Visibility /> Display
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
