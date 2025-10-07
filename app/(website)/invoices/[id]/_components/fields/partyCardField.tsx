import { InvoiceData, Party } from "@/lib/types/invoice";

type Props = {
  label: string;
  side: "from" | "billTo";
  data: InvoiceData;
  mode: "preview" | "edit";
  update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;
};

export default function PartyCardField({
  label,
  side,
  data,
  mode,
  update,
}: Props) {
  const party = data[side];
  const fields = ["name", "email", "address", "phone"] as const;

  // Merge partial edits back into the correct side (from/billTo)
  const patch = (patchData: Partial<Party>) =>
    update(side, { ...party, ...patchData } as InvoiceData[typeof side]);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginBottom: 6,
          fontWeight: 600,
        }}
      >
        {label}
      </div>

      {mode === "edit" ? (
        <>
          {fields.map((fieldKey) => (
            <input
              key={fieldKey}
              value={(party[fieldKey] as string) ?? ""}
              onChange={(e) => patch({ [fieldKey]: e.target.value } as Partial<Party>)}
              placeholder={fieldKey[0].toUpperCase() + fieldKey.slice(1)}
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                marginBottom: 6,
              }}
            />
          ))}
        </>
      ) : (
        <>
          <div style={{ fontWeight: 600 }}>{party.name || "—"}</div>
          {!!party.email && <div>{party.email}</div>}
          {!!party.address && <div>{party.address}</div>}
          {!!party.phone && <div>{party.phone}</div>}
        </>
      )}
    </div>
  );
}
