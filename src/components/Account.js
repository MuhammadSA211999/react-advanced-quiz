import { Link } from "react-router-dom";
import classes from "../styles/Account.module.css";
import { useAuth } from "../contexts/AuthContext";
export default function Account() {
  const { currentUser, logout } = useAuth()

  return (
    <div className={classes.account}>
      {currentUser ? <><span className="material-icons-outlined" title="Account">
        account_circle
      </span>
        <span onClick={logout}
          className="material-icons-outlined" title="Logout"> logout </span></> : <Link to="/login">Login</Link>}


    </div>
  );
}
