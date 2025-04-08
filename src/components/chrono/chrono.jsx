import React from "react"
import './chrono.scss'

const Chront=()=>{
  let dt=[
    {"date": "September 26", "title": "Registrations open"},
    {"date": "October 5", "title": "Registrations close"},
    {"date": "October 8", "title": "Deadline for confirmation of finalists"},
    {"date": "October 14", "title": "Showdown begins"},
    {"date": "October 15", "title": "Showdown ends"}
  ]
  
  return(
    <div className="mg">
<div className="con">
  <div className="wr cvr" >
    <h1>Important Dates</h1>
    <ul className="sessions">
      {
        dt.map((i)=>{return(
          <li>
          <div className="tm">{i.date}</div>
          <p>{i.title}</p>
        </li>)
        })
      }
    </ul>
  </div>
</div> 
</div>
  )}

  export default Chront; 