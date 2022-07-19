import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  PlayCircleOutline,
  List,
  AddToQueue,
  QueuePlayNext,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/articles" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Articles
              </li>
            </Link>
            <Link to="/groups" className="link">
              <li className="sidebarListItem">
                <List className="sidebarIcon" />
                Groups
              </li>
            </Link>
            <Link to="/tags" className="link">
              <li className="sidebarListItem">
                <List className="sidebarIcon" />
                Tags
              </li>
            </Link>
            <Link to="/newarticle" className="link">
              <li className="sidebarListItem">
                <AddToQueue className="sidebarIcon" />
                Create Article
              </li>
            </Link>
            <Link to="/newgroup" className="link">
              <li className="sidebarListItem">
                <QueuePlayNext className="sidebarIcon" />
                Create Group
              </li>
            </Link>
            <Link to="/newtag" className="link">
              <li className="sidebarListItem">
                <QueuePlayNext className="sidebarIcon" />
                Create Tag
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
