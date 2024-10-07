import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateGenerator = ({ studentName }) => {
  const certificateRef = useRef();

  const handleGenerateCertificate = () => {
    const input = certificateRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 280, 190);
      pdf.save(`${studentName}_certificate.pdf`);
    });
  };

  return (
    <div className="p-8">
      {/* Generate Certificate Button */}
      <button
        className="bg-yellow-500 text-white p-4 rounded-lg"
        onClick={handleGenerateCertificate}
      >
        Generate Certificate
      </button>

      {/* Hidden Certificate Template */}
      <div
        ref={certificateRef}
        className="certificate mt-10 p-10 bg-white border-2 border-gray-300"
        style={{
          width: '800px',
          height: '600px',
          position: 'absolute',
          left: '-9999px',
          top: '0',
        }}
      >
        <div className="certificate-content text-center">
          <h1 className="text-4xl font-bold">Certificate of Completion</h1>
          <p className="mt-8 text-xl">
            This certificate is proudly presented to
          </p>
          <h2 className="mt-4 text-3xl font-semibold">{studentName}</h2>
          <p className="mt-4 text-lg">
            For successfully completing SDG Trainings by Team Pyyoneers!
          </p>
          <div className="mt-8">
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">Signature: ____________________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
