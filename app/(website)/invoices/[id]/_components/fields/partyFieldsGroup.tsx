import { InvoiceData } from "@/lib/types/invoice";
import PartyCardField from "./partyCardField";


export default function PartyFieldsGroup (
    {
 data,
  mode,
    update,

}: {
  data: InvoiceData;
  mode: "preview" | "edit";
update: <K extends keyof InvoiceData>(key: K, val: InvoiceData[K]) => void;

}
) {
    return (
        <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
        >
            <PartyCardField
                label="From"
                side="from"
                data={data}
                mode={mode}
                update={update}
            />
                <PartyCardField
                    label="Bill To"
                    side="billTo"
                    data={data}
                    mode={mode}
                    update={update}
                />
        </div>
    )
}