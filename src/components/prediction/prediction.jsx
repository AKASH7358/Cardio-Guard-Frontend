import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./prediction.scss";

const Prediction = () => {
    const [patientName, setPatientName] = useState(localStorage.getItem("patientName") || "");
    const [age, setAge] = useState(localStorage.getItem("age") || "");
    const [location, setLocation] = useState(localStorage.getItem("location") || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    // Save input values to localStorage
    useEffect(() => {
        localStorage.setItem("patientName", patientName);
        localStorage.setItem("age", age);
        localStorage.setItem("location", location);
    }, [patientName, age, location]);

    // Image Upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Drag & Drop Handling
    const handleDragOver = (event) => event.preventDefault();
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Capture Image from Camera
    const captureImage = () => {
        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        if (video) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                setSelectedFile(blob);
                setPreviewImage(URL.createObjectURL(blob));
            }, "image/png");
        }
    };

    // Send Image to Backend
    const handlePrediction = async () => {
        if (!selectedFile) {
            alert("Please upload or capture an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile, "image.png");

        try {
            const response = await fetch("https://AKASH7358-heart-disease-api.hf.space/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.prediction) {
                throw new Error("Invalid response from server.");
            }

            setPredictionResult(`Prediction: ${data.prediction}`);

            navigate("/resultchatbot", {
                state: {
                    patientName,
                    age,
                    location,
                    uploadedImage: previewImage, // Only pass uploaded image
                    predictedCondition: data.prediction, // Prediction result
                    annotatedImage: data.image ? `${data.image}` : null // Annotated Image (if available)
                },
            });
            
            
        } catch (error) {
            console.error("Error:", error);
            alert("Error occurred. Please try again.");
        }
    };

    return (
        <div className="prediction-container">
            <h1 className="title">🔍 MRI IMAGE PREDICTION</h1>
            
            {/* Patient Details */}
            <div className="patient-details">
                <input type="text" placeholder="Name of the patient" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                <input type="number" placeholder="Age of the patient" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            {/* Upload Section */}
            <div className="upload-box" onDragOver={handleDragOver} onDrop={handleDrop}>
                <p>Drag & Drop your MRI image here or</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} id="fileInput" hidden />
                <label htmlFor="fileInput" className="upload-btn">Upload Image</label>
            </div>

            <button className="camera-btn" onClick={() => videoRef.current.play()}>📷 Use Webcam</button>

            {videoRef.current && (
                <div className="camera-container">
                    <video ref={videoRef} autoPlay></video>
                    <button className="capture-btn" onClick={captureImage}>Capture</button>
                </div>
            )}

            {previewImage && (
                <div className="image-preview">
                    <img src={previewImage} alt="Selected" />
                    <button className="predict-btn" onClick={handlePrediction}>Predict</button>
                </div>
            )}
        </div>
    );
};

export default Prediction;
