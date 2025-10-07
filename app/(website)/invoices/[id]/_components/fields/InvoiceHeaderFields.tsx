import { InvoiceData } from "@/lib/types/invoice";
import InvoiceTitleField from "./InvoiceTitleField";
import InvoiceLogoField from "./InvoiceLogoField";

export function InvoiceHeaderFields({
  data,
  mode,
  update,
}: {
  data: InvoiceData;
  mode: "preview" | "edit";
  update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 160px",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <InvoiceTitleField data={data} mode={mode} update={update} />
      <InvoiceLogoField data={data} mode={mode} update={update} />
    </div>
  );
}
