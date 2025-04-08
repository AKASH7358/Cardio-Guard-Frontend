import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/nav";
import Hero from "./components/hero/hero";
import Footer from "./components/footer/footer";
import Time from "./components/counrdown";
import ResultChatbot from "./components/resultchatbot/resultchatbot";
import Prediction from "./components/prediction/prediction";
import Report from "./components/report/report";
import Aboutus from "./components/aboutnew/abooutus";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css"; // Import CSS for styling

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="https://res.cloudinary.com/dozq6vspe/video/upload/v1742128665/background_vd6cf8.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Routes>
        <Route path="/timer" element={<Time />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Hero />} />
          <Route
            path="resultchatbot"
            element={<ResultChatbot list={[
              "It is a 24-hour OFFLINE Hackathon.",
              "The team must comprise of 2 members, minimum, with a maximum of 4.",
              "Students, irrespective of streams, are welcome to apply to take part in the competition.",
              "All projects must pertain to at least one of the domains mentioned in the problems site. Projects falling out of scope will not be considered.",
              "A project abstract is to be attached. This abstract will be used to shortlist a select number of teams for the final showdown.",
              "The abstract, in a brief manner, should expound upon the approach that is proposed to be employed during the Hackathon.",
              "The abstract must be original. Plagiarism will be strictly condemned and will be disqualified immediately.",
              "Upon being shortlisted, an entry fee of ₹200 per team must be paid in order to complete registration.",
              "In the spirit of competition, it is our humble request that the code / algorithm be developed in-venue only throughout the duration of the hackathon.",
              "Registrations for the first round are limited to 70 teams on a first-come, first-served basis."
            ]} />}
          />
          <Route path="prediction" element={<Prediction />} />
          <Route path="report" element={<Report />} />
          <Route path="aboutus" element={<Aboutus />} />
        </Route>
      </Routes>

      {location.pathname !== "/timer" && <Footer />}
    </div>
  );
}

export default App;
