"use client";

import Link from "next/link";
import { Eye, Pencil } from "lucide-react";
import dynamic from "next/dynamic";
import { InvoiceData } from "@/lib/types/invoice";

// ✅ Lazy-load PDFDownloadBtn for client-only rendering
const PdfDownloadButton = dynamic(() => import("./fields/pdfDownloadBtn"), {
  ssr: false,
});

type Mode = "preview" | "edit";

interface ToolbarProps {
  invoiceId: string;
  mode: "preview" | "edit";
  pdfData?: InvoiceData; // ✅ make optional for flexibility
}


const baseBtn: React.CSSProperties = {
  textDecoration: "none",
  padding: "6px 12px",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.15s ease",
};

const iconStyle: React.CSSProperties = { marginRight: 6 };

const headerStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#fff",
  borderBottom: "1px solid #e5e7eb",
  padding: "8px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

export default function Toolbar({ invoiceId, mode, pdfData }: ToolbarProps) {

  const base = `/invoices/${invoiceId}`;
  const isPreview = mode === "preview";

  const renderNavButton = (
    href: string,
    label: string,
    active: boolean,
    Icon: React.ElementType,
    activeColor: string,
    inactiveColor: string
  ) => (
    <Link
      href={href}
      style={{
        ...baseBtn,
        backgroundColor: active ? activeColor : inactiveColor,
        color: active ? "#fff" : "#111",
      }}
    >
      <Icon size={16} style={iconStyle} />
      {label}
    </Link>
  );

  return (
    <header style={headerStyle}>
      <div
        style={{
          display: "flex",
          gap: 8,
          width: "85%",
          margin: "auto",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center space-x-2">
          {renderNavButton(
            `${base}?mode=preview`,
            "Preview",
            isPreview,
            Eye,
            "#9ca3af",
            "#f3f4f6"
          )}

          {renderNavButton(
            `${base}?mode=edit`,
            "Edit",
            !isPreview,
            Pencil,
            "#9ca3af",
            "#f3f4f6"
          )}
        </div>

        {/* ✅ PDF Download Button */}
 
 {pdfData ? (
  <PdfDownloadButton data={pdfData} filename={`invoice-${invoiceId}.pdf`} />
) : (
  <div style={{ fontSize: 12, color: "#6b7280" }}>PDF not ready</div>
)}

      </div>
    </header>
  );
}
