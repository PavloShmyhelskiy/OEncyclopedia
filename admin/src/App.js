import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Login from "./pages/login/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";
import ArticleList from "./pages/articlesList/ArticlesList";
import Article from "./pages/article/Article";
import NewArticle from "./pages/newArticle/NewArticle";
import NewGroup from "./pages/newGroup/NewGroup";
import GroupList from "./pages/groupList/GroupList";
import Group from "./pages/group/Group";
import TagsList from "./pages/tagList/TagsList";
import Tag from "./pages/tag/Tag";
import NewTag from "./pages/newTag/NewTag";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/articles">
                <ArticleList />
              </Route>
              <Route path="/article/:articleId">
                <Article />
              </Route>
              <Route path="/newArticle">
                <NewArticle />
              </Route>
              <Route path="/groups">
                <GroupList />
              </Route>
              <Route path="/group/:groupId">
                <Group />
              </Route>
              <Route path="/newgroup">
                <NewGroup />
              </Route>
              <Route path="/tags">
                <TagsList />
              </Route>
              <Route path="/tag/:tagId">
                <Tag />
              </Route>
              <Route path="/newtag">
                <NewTag />
              </Route>
            </div>
          </>
        ) : <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
