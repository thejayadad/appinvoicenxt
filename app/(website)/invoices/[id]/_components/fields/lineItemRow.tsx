import * as React from "react";
import { InvoiceItem } from "@/lib/types/invoice";

function currency(n: number, ccy = "USD") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: ccy }).format(n || 0);
}

type Props = {
  item: InvoiceItem;
  mode: "preview" | "edit";
  currencyCode: string;
  onChange: (patch: Partial<InvoiceItem>) => void;
  onRemove?: () => void;
};

export default function LineItemRow({
  item,
  mode,
  currencyCode,
  onChange,
  onRemove,
}: Props) {
  const amount = (Number(item.rate) || 0) * (Number(item.qty) || 0);

  if (mode === "preview") {
    return (
      <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
        <td style={{ padding: "6px 0" }}>{item.description || "—"}</td>
        <td style={{ padding: "6px 0", textAlign: "right" }}>{currency(item.rate, currencyCode)}</td>
        <td style={{ padding: "6px 0", textAlign: "right" }}>{item.qty}</td>
        <td style={{ padding: "6px 0", textAlign: "right" }}>{currency(amount, currencyCode)}</td>
        <td />
      </tr>
    );
  }

  // edit mode
  return (
    <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
      <td style={{ padding: "6px 0" }}>
        <input
          value={item.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Description"
          style={{ width: "100%", padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }}
        />
      </td>
      <td style={{ padding: "6px 0", textAlign: "right" }}>
        <input
          type="number"
          value={item.rate}
          onChange={(e) => onChange({ rate: Number(e.target.value) || 0 })}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            textAlign: "right",
          }}
        />
      </td>
      <td style={{ padding: "6px 0", textAlign: "right" }}>
        <input
          type="number"
          value={item.qty}
          onChange={(e) => onChange({ qty: Number(e.target.value) || 0 })}
          style={{
            width: "100%",
            padding: 8,
            border: "1px solid #e5e7eb",
            borderRadius: 6,
            textAlign: "right",
          }}
        />
      </td>
      <td style={{ padding: "6px 0", textAlign: "right" }}>{currency(amount, currencyCode)}</td>
      <td style={{ textAlign: "right" }}>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{
              color: "#b91c1c",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        )}
      </td>
    </tr>
  );
}
