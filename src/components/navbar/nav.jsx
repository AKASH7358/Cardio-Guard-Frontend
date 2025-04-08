import "./nav.css"
import { Fragment } from "react";
import logo from './static/cardio-guard-logo.png'
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar=()=>{
    const toggle=()=>{
        document.querySelector('.nav-buttons-mobile').classList.toggle('hidden-nav')
        let i=0;
        document.querySelectorAll('.hamburger span').forEach((span)=>{ 
          i+=1; 
          span.classList.toggle(`close-${i}`);
         })
      }
    return(
        <Fragment>
        <nav className="header-nav">
        <div className="branding">
            
            <Link to="/"  onClick={toggle}><img className="evt" src={logo} alt=""/></Link>
            
            
        </div>

        <div className="nav-buttons">
            <Link to="/" className="nav-btn"  onClick={toggle}>Home</Link>
            <Link to="/aboutus" className="nav-btn"  onClick={toggle}>About us</Link>
            <Link to="/prediction" className="nav-btn"  onClick={toggle}>Prediction</Link>
            
          
            <Link to="resultchatbot" className="nav-btn"  onClick={toggle}>Result</Link>
            <Link to="/report" className="nav-btn ghost-btn"  onClick={toggle}>Report</Link>
        </div>
    
    </nav>

    <div className="nav-buttons-mobile hidden-nav">
        <Link to="/" className="nav-btn"  onClick={toggle} >Home</Link>
        <Link to="/aboutus" className="nav-btn"  onClick={toggle}>About us</Link>
        <Link to="/prediction" className="nav-btn"  onClick={toggle}>Prediction</Link>
        {/* <div onClick={() => window.location.replace("/#about")}>
               
            </div> */}
     
        <Link to="resultchatbot" className="nav-btn"  onClick={toggle}>Result</Link>
        <Link to="/report" className="nav-btn ghost-btn"  onClick={toggle}>Report</Link>
    </div>

    <div className="hamburger" onClick={toggle}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
    </div>
    <Outlet/>

    </Fragment>

    )   

}
export default Navbar;