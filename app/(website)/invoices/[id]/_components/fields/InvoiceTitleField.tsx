import { InvoiceData } from "@/lib/types/invoice";

export default function InvoiceTitleField({
  data,
  mode,
  update,
}: {
  data: InvoiceData;
  mode: "preview" | "edit";
  update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;
}) {
  return (
    <div>
      <label style={{ fontSize: 12, color: "#6b7280" }}>Invoice Title</label>
      {mode === "edit" ? (
        <input
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Invoice"
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            marginTop: 4,
          }}
        />
      ) : (
        <h1 style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
          {data.title || "Untitled Invoice"}
        </h1>
      )}
    </div>
  );
}
