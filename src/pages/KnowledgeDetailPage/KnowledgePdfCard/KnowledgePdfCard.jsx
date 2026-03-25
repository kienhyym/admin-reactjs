import { useState } from "react";
import "./KnowledgePdfCard.css";
import { Document, Page ,pdfjs} from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.mjs`;

const KnowledgePdfCard = ({ data}) => {
    const [numPages, setNumPages] = useState(null);
    return (
        <div className="pdf-container">
            <Document
                file={import.meta.env.VITE_BACKEND_URL + "v1/api/pdf/" + data._id}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(err) => console.error("PDF error:", err)}
            >
                {Array.from(new Array(numPages || 0), (_, index) => (
                    <Page width={800} key={index} pageNumber={index + 1} renderTextLayer={false} />
                ))}
            </Document>
        </div>
    );

};

export default KnowledgePdfCard;