import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./resultchatbot.css";

const ResultChatbot = () => {
    const location = useLocation();
    
    // Extract data from navigation state
    const result = location.state?.predictedCondition || "No result available";
    const patientName = location.state?.patientName || "Unknown";
    const age = location.state?.age || "Unknown";
    const patientLocation = location.state?.location || "Unknown";
    const uploadedImage = location.state?.uploadedImage || null;
    const annotatedImage = location.state?.annotatedImage || "";

    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Function to send a message to the chatbot
    const handleSendMessage = async () => {
        if (message.trim() !== "") {
            const newMessages = [...messages, { text: message, sender: "user" }];
            setMessages(newMessages);
            setMessage("");
    
            try {
                const response = await fetch("https://cardio-guard-backend.onrender.com/chatbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_input: message,
                        prediction_result: result,  // Sending the predicted result to the chatbot
                    }),
                });
    
                const data = await response.json();
    
                if (data.response) {
                    setMessages([...newMessages, { text: data.response, sender: "bot" }]);
                } else {
                    setMessages([...newMessages, { text: "Error: No response from chatbot.", sender: "bot" }]);
                }
            } catch (error) {
                console.error("Error:", error);
                setMessages([...newMessages, { text: "Error connecting to chatbot.", sender: "bot" }]);
            }
        }
    };
    
    const resultColor = result.toLowerCase() === "normal" ? "green" : "red";

    return (
        <div className="result-container">
            <h2 className="title1">PREDICTION RESULT</h2>
            <p className="result-text" style={{ color: resultColor }}>
                <strong4>{result}</strong4>
            </p>

            <h3 className="title2">PATIENT DETAILS</h3>
            <p><strong>Name :</strong> <strong2>{patientName}</strong2></p>
            <p><strong>Age :</strong> <strong2>{age}</strong2></p>
            <p><strong>Location :</strong> <strong2>{patientLocation}</strong2></p>

            

            {/* Show Annotated Image (if available) */}
            {annotatedImage && (
                <div className="image-container">
                    <h3><strong3>Annotated MRI Scan</strong3></h3>
                    <img src={`data:image/png;base64,${annotatedImage}`} alt="Annotated MRI" className="annotated-image" />
                </div>
            )}

            {/* Button to Navigate to Report Page */}
            <Link to="/report" state={{
                patientName,
                age,
                location: patientLocation,
                uploadedImage, 
                predictedCondition: result, 
                annotatedImage
            }}>
                <button className="butn">Generate Report</button>
            </Link>

            {/* Chatbot UI */}
            <div className="chatbot-icon" onClick={() => setChatOpen(!chatOpen)}>
                💬 Chat
            </div>

            <div className={`chatbot-slider ${chatOpen ? "open" : ""}`}>
                <div className="chatbot-header">
                    <h3>Chatbot</h3>
                    <button className="close-btn" onClick={() => setChatOpen(false)}>✖</button>
                </div>
                <div className="chatbot-body">
                    {messages.map((msg, index) => (
                        <p key={index} className={`chat-message ${msg.sender}`}>
                            {msg.text}
                        </p>
                    ))}
                </div>
                <div className="chatbot-footer">
                    <input 
                        type="text" 
                        placeholder="Ask something..." 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        className="chat-input"
                    />
                    <button className="send-btn" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ResultChatbot;
