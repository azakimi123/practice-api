import React, { useContext, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./Nav.scss";

export default () => {
  const [userData] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  // kick back to auth page if not signed in
  useEffect(() => {
    if (!userData.id) history.push("/");
  }, [history, location, userData.id]);

  // don't show if on auth page
  if (location.pathname === "/") return null;


  console.log(userData)
  return (
    <section className="nav-background">
      <div className="nav">
        <label>Meal2Plan</label>
        <section className='right-nav'>
          <Link className='nav-link' to="/test">Test</Link>
          <Link className='nav-link' to="/meal-plan">Meal Plan</Link>
          <Link className='nav-link' to="/profile"><img className='profile-pic' src={userData.profile_picture}/></Link>
        </section>
      </div>
    </section>
  );
};
