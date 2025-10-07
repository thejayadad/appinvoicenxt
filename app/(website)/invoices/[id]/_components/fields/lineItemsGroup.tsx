import * as React from "react";
import { InvoiceData, InvoiceItem } from "@/lib/types/invoice";
import LineItemRow from "./lineItemRow";

type Props = {
  data: InvoiceData;
  mode: "preview" | "edit";
  update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;
};

export default function LineItemsGroup({ data, mode, update }: Props) {
  const ccy = data.currency || "USD";

  const updateItem = (id: string, patch: Partial<InvoiceItem>) => {
    const next = data.items.map((it) => (it.id === id ? { ...it, ...patch } : it));
    update("items", next);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      description: "",
      rate: 0,
      qty: 1,
    };
    update("items", [...data.items, newItem]);
  };

  const removeItem = (id: string) => {
    update("items", data.items.filter((it) => it.id !== id));
  };

  return (
    <div>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Line Items</div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            <th style={{ textAlign: "left", paddingBottom: 6 }}>Description</th>
            <th style={{ textAlign: "right", paddingBottom: 6, width: 120 }}>Rate</th>
            <th style={{ textAlign: "right", paddingBottom: 6, width: 80 }}>Qty</th>
            <th style={{ textAlign: "right", paddingBottom: 6, width: 130 }}>Amount</th>
            <th style={{ width: 40 }} />
          </tr>
        </thead>

        <tbody>
          {data.items.map((item) => (
            <LineItemRow
              key={item.id}
              item={item}
              mode={mode}
              currencyCode={ccy}
              onChange={(patch) => updateItem(item.id, patch)}
              onRemove={mode === "edit" ? () => removeItem(item.id) : undefined}
            />
          ))}
        </tbody>
      </table>

      {mode === "edit" && (
        <button
          type="button"
          onClick={addItem}
          style={{
            marginTop: 8,
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "#f9fafb",
            cursor: "pointer",
          }}
        >
          + Add Line
        </button>
      )}
    </div>
  );
}
