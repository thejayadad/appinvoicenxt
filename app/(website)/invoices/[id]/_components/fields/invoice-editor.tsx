"use client";

import { useState } from "react";
import { InvoiceData } from "@/lib/types/invoice";
import Toolbar from "../toolbar";
import { InvoiceHeaderFields } from "./InvoiceHeaderFields";
import PartyFieldsGroup from "./partyFieldsGroup";
import LineItemGroup from "./lineItemsGroup";
import TotalsCard from "./totalCard";
import NotesSection from "./notesSection";


export default function InvoiceEditor({
  initialData,
  mode,
}: {
  initialData: InvoiceData;
  mode: "preview" | "edit";
}) {
  const [data, setData] = useState<InvoiceData>(initialData);

  // ✅ Generic, type-safe updater function
  const update = <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }));

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
<Toolbar invoiceId={data.id} mode={mode} pdfData={data} />

      <div
        style={{
          margin: "24px auto",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 16,
        }}
      >
        <main
          style={{
            backgroundColor: "#fff",
            padding: 24,
            borderRadius: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            color: "#111",
          }}
        >
          <InvoiceHeaderFields data={data} mode={mode} update={update} />
          <PartyFieldsGroup mode={mode} data={data} update={update} />
          <LineItemGroup mode={mode} data={data} update={update}
          
          />
          <TotalsCard data={data} mode={mode} update={update} />
          <NotesSection data={data} mode={mode} update={update} />

        </main>
      </div>
    </div>
  );
}
