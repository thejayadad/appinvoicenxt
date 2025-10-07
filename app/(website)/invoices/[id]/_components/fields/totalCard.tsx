import { InvoiceData } from "@/lib/types/invoice";

function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount || 0);
}

export default function TotalsCard({
  data,
  mode,
  update,
}: {
  data: InvoiceData;
  mode: "preview" | "edit";
  update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;
}) {
  const ccy = data.currency || "USD";
  const subtotal = data.items.reduce(
    (sum, item) => sum + (item.rate || 0) * (item.qty || 0),
    0
  );
  const tax = subtotal * ((data.taxPercent || 0) / 100);
  const total = subtotal + tax;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 12,
        marginTop: 16,
      }}
    >
      <div />
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: 6,
            fontSize: 14,
          }}
        >
          <div>Subtotal</div>
          <div style={{ textAlign: "right" }}>
            {formatCurrency(subtotal, ccy)}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            Tax&nbsp;
            {mode === "edit" ? (
              <input
                type="number"
                value={data.taxPercent ?? 0}
                onChange={(e) =>
                  update("taxPercent", Number(e.target.value) || 0)
                }
                style={{
                  width: 60,
                  padding: "2px 4px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 4,
                  textAlign: "right",
                  marginRight: 4,
                }}
              />
            ) : (
              <>({data.taxPercent || 0}%)</>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            {formatCurrency(tax, ccy)}
          </div>

          <div style={{ fontWeight: 700 }}>Total</div>
          <div style={{ textAlign: "right", fontWeight: 700 }}>
            {formatCurrency(total, ccy)}
          </div>
        </div>
      </div>
    </div>
  );
}
