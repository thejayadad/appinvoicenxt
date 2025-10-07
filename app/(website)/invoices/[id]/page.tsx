import { InvoiceData } from "@/lib/types/invoice";
import InvoiceEditor from "./_components/fields/invoice-editor";


async function getInvoice(id: string): Promise<InvoiceData> {
  return {
    id,
    title: "Invoice",
    from: { name: "IndyDevLab", email: "hello@indylab.dev" },
    billTo: { name: "Client Name" },
    number: "INV0001",
    date: new Date().toISOString().slice(0, 10),
    status: "Draft", // ✅ valid union value
    items: [],
    taxPercent: 0,
    currency: "USD",
    notes: "",
    brand: { name: "Invoice Simple Clone" },
  };
}


export default async function InvoicePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { mode?: "preview" | "edit" };
}){
    const initialData = await getInvoice(params.id);
const mode = await searchParams.mode === "preview" ? "preview" : "edit";
    return <InvoiceEditor initialData={initialData} mode={mode} />
}