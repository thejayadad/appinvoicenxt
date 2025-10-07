"use client";

import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import dynamic from "next/dynamic";

// Lazy-load PDF button (client-only)
// const PdfDownloadButton = dynamic(
//   () => import("@/_components/PdfDownloadReactPdf.client"),
//   { ssr: false }
// );

type Mode = "preview" | "edit";

interface ToolbarProps {
  invoiceId: string;
  mode: Mode;
}

// ✅ Reusable inline style helpers
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

export default function Toolbar({ invoiceId, mode,  }: ToolbarProps) {
  const base = `/invoices/${invoiceId}`;
  const isPreview = mode === "preview";

  // Extracted button rendering for DRYness
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
      <div style={{ display: "flex", gap: 8, width: "85%", margin: "auto" }}>
        {renderNavButton(
          `${base}?mode=preview`,
          "Preview",
          isPreview,
          Eye,
          "#9ca3af", // neutral gray for edit (was blue)
          "#f3f4f6"
        )}

        {renderNavButton(
          `${base}?mode=edit`,
          "Edit",
          !isPreview,
          Pencil,
          "#9ca3af", // neutral gray for edit (was blue)
          "#f3f4f6"
        )}
      </div>

      {/* ✅ Safe client-only PDF download (if provided) */}
      {/* {pdfData ? (
        <PdfDownloadButton data={pdfData} filename={`invoice-${invoiceId}.pdf`} />
      ) : (
        <div style={{ fontSize: 12, color: "#6b7280" }}>PDF not ready</div>
      )} */}
    </header>
  );
}
