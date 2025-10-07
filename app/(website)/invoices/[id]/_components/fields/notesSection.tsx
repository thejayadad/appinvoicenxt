import { InvoiceData } from "@/lib/types/invoice";

export default function NotesSection({
  data,
  mode,
  update,
}: {
  data: InvoiceData;
  mode: "preview" | "edit";
  update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;
}) {
  return (
    <div style={{ marginTop: 12 }}>
      <label
        style={{
          fontSize: 12,
          color: "#6b7280",
          display: "block",
          marginBottom: 4, 
        }}
      >
        Notes
      </label>

      {mode === "edit" ? (
        <textarea
          value={data.notes || ""}
          onChange={(e) => update("notes", e.target.value)}
          rows={4}
          placeholder="Notes to customer"
          style={{
            width: "100%",
            padding: 10,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            resize: "vertical",
            fontSize: 14,
            color: "#111",
          }}
        />
      ) : (
        <p
          style={{
            whiteSpace: "pre-wrap",
            marginTop: 6,
            fontSize: 14,
            color: data.notes ? "#111" : "#9ca3af",
          }}
        >
          {data.notes || "—"}
        </p>
      )}
    </div>
  );
}
