import React from "react";
import Slider from "react-slick";
import './about.css';

const About = () => {
    // List of image links
    const images =  [
        "https://res.cloudinary.com/dozq6vspe/image/upload/v1741200901/1_zkxxzz.jpg",
        "https://res.cloudinary.com/dozq6vspe/image/upload/v1741200902/2_xmjcgm.jpg",
        "https://res.cloudinary.com/dozq6vspe/image/upload/v1741200903/3_o3cviy.jpg"
    ];

    // Slider settings
    const settings = {
        dots: false,
        infinite: true,
        arrows:false,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 400, // 3 seconds
        fade: true, // Enable fade transition
        cssEase: "linear"
    };

    return (
        <section className="about-us" id="about-us">
            <div className="about-content">
                <div className="about-text">
                    <h1>About Cardio Guard</h1>
                    <p>Cardio Guard is an AI-driven heart disease prediction system designed to enhance early diagnosis and improve patient outcomes. Using deep learning models, it analyzes medical data to provide accurate predictions, aiding healthcare professionals in making informed decisions. This project combines advanced machine learning techniques with medical insights to revolutionize cardiovascular healthcare.</p>
                    
                </div>
                <div className="carousel">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default About;


// import React from "react";
// import'./about.css'
// const About=()=>{
//     return(
//     <section className="about-us" id="about-us">
//         <h1>About Datasprint</h1>
//         <div>Are you ready to embark on a data-driven adventure? DataSprint is your chance to immerse yourself in the world of AI and data science. Whether you're a coding prodigy or a creative thinker, this hackathon offers a platform to showcase your skills, learn from industry exports, and collaborate with like-minded enthusiasts.
// <br/>
// <br/>
//         Join us for an exhilarating journey into the realm of artificial intelligence and data science at DataSprint, an extraordinary hackathon organized by the Department of <span class="ai">Artificial Intelligence and Data Science</span> at Sri Sairam Institute of Technology.</div>
//     </section>
//     )
// }
// export default About;