import React from "react";

import "./footer.css"
const Footer=()=>{
    return(
      
  <footer className="footer-main bg-dark fixed-bottom" style={{  position: "relative",bottom: "-300px"}}>
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-sm-12 col-xs-12">
        <div className="address-box clearfix">
          <div className="add-icon">
            <img src="https://res.cloudinary.com/dcsduqstu/image/upload/v1692262136/telephone_l5izyw.png" alt="" />
          </div>
          <div className="add-content">
            <h5>Phone</h5>
            <p> +91 7358189485
 <br />
            +91 8610904524  </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-sm-12 col-xs-12">
        <div className="address-box clearfix">
          <div className="add-icon" >
            <img src={"https://res.cloudinary.com/dcsduqstu/image/upload/v1692261725/gmail_ys11xo.png"} alt="" />
          </div>
          <div className="add-content">
            <h5>Email</h5>
            <p> <a href="mailto:datasprint.ai@gmail.com" style={{textDecoration:"none"}}>cardioguardhealth@gmail.com</a> </p>
          </div>
        </div>
      </div>
    </div>
</div>

<footer className="bg-dark text-center text-white">

<div className="container p-4 pb-0">
  <section className="mb-">
    

    <a className="btn btn-outline-light btn-floating m-1" target="_self" href="https://www.linkedin.com/in/akash-m-v-r7358/" role="button"
      ><i className="fa fa-linkedin"></i
    ></a>

    <a className="btn btn-outline-light btn-floating m-1" target="_self" href="http://ai.sairamit.edu.in/" role="button"
      ><i className="fa fa-google"></i
    ></a>

    <a className="btn btn-outline-light btn-floating m-1" target="_self" href="https://www.instagram.com/aids_sairamit/?igshid=MzRlODBiNWFlZA%3D%3D" role="button"
      ><i className="fa fa-instagram"></i
    ></a>

  </section>
</div>

<div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
CARDIO GUARD © 2025 All Rights Reserved.
 
                     </div>
</footer>
</footer>

)}
export default Footer;