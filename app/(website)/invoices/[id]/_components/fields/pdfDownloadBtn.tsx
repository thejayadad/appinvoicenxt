"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown } from "lucide-react";
import { InvoiceData } from "@/lib/types/invoice";
import InvoicePDFDoc from "./InvoicePDFDoc";

export default function PdfDownloadBtn({
  data,
  filename,
}: {
  data: InvoiceData;
  filename: string;
}) {
  return (
    <PDFDownloadLink
document={<InvoicePDFDoc data={data} />} // ✅ correct
      fileName={filename}
      style={{
        textDecoration: "none",
      }}
    >
      {({ loading }) => (
        <button
          type="button"
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#111827",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FileDown size={16} style={{ marginRight: 6 }} />
          {loading ? "Generating..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
