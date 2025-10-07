import { InvoiceData } from "@/lib/types/invoice";

export default function InvoiceLogoField({
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
      <label style={{ fontSize: 12, color: "#6b7280" }}>Logo URL</label>
      {mode === "edit" ? (
        <input
          value={data.logoUrl || ""}
          onChange={(e) => update("logoUrl", e.target.value)}
          placeholder="https://…/logo.png"
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            marginTop: 4,
          }}
        />
      ) : data.logoUrl ? (
        <img
          src={data.logoUrl}
          alt="logo"
          width={120}
          style={{
            marginTop: 4,
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            objectFit: "contain",
          }}
        />
      ) : (
        <div
          style={{
            width: 120,
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af",
            fontSize: 12,
            border: "1px dashed #e5e7eb",
            borderRadius: 6,
            marginTop: 4,
          }}
        >
          No logo
        </div>
      )}
    </div>
  );
}
