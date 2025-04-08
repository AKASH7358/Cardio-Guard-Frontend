import React from "react";
import { Page, Text, View, Document, Image, StyleSheet, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import "./report.css";
import { useLocation } from "react-router-dom";

// Styles for the PDF document
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  title: { fontSize: 20, textAlign: "center", marginBottom: 10 },
  section: { marginBottom: 10 },
  label: { fontWeight: "bold", marginTop: 5 },
  image: { width: 250, height: 250, marginVertical: 10, alignSelf: "center" },
});

// PDF Document Component
const ReportPDF = ({ patientName, age, location, uploadedImage, predictedCondition, annotatedImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo instead of Title */}
      <Image className="clg" src="https://res.cloudinary.com/dozq6vspe/image/upload/v1741245203/project_logo_fd5yby.png" style={styles.logo} />

      {/* Patient Details */}
      <View style={styles.section}>
        <Text style={styles.label}>Patient Name: {patientName}</Text>
        <Text style={styles.label}>Age: {age}</Text>
        <Text style={styles.label}>Location: {location}</Text>
      </View>

      {/* Uploaded Image */}
      {uploadedImage && (
        <View style={styles.section}>
          <Text style={styles.label}>Uploaded MRI Scan:</Text>
          <Image src={uploadedImage} style={styles.image} />
        </View>
      )}

      {/* Prediction Result */}
      <View style={styles.section}>
        <Text style={styles.label}>Predicted Condition: {predictedCondition}</Text>
      </View>

      {/* Annotated Image if available */}
      {annotatedImage && (
        <View style={styles.section}>
          <Text style={styles.label}>Annotated MRI Scan:</Text>
          <Image src={`data:image/png;base64,${annotatedImage}`} style={styles.image} />
        </View>
      )}
    </Page>
  </Document>
);


// Main Report Component




const Report = () => {
  const location = useLocation();
  const { patientName, age, location: patientLocation, uploadedImage, predictedCondition, annotatedImage } = location.state || {};

  return (
    <div className="report-container">
    <h2 className="report-title">Report of the Patient</h2>

    {/* PDF Viewer */}
    <div className="pdf-container">
      <PDFViewer className="pdf-viewer" >
        <ReportPDF className="pdf-original"
          patientName={patientName} 
          age={age} 
          location={patientLocation} 
          uploadedImage={uploadedImage} 
          predictedCondition={predictedCondition} 
          annotatedImage={annotatedImage} 
        />
      </PDFViewer>
      </div>

      <PDFDownloadLink 
        document={<ReportPDF 
          patientName={patientName} 
          age={age} 
          location={patientLocation} 
          uploadedImage={uploadedImage} 
          predictedCondition={predictedCondition} 
          annotatedImage={annotatedImage} 
        />} 
        fileName="MRI_Report.pdf"
      >
        {({ loading }) => (
        <button className="download-button">
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </button>
      )}
      </PDFDownloadLink>
    </div>
  );
};


export default Report;


