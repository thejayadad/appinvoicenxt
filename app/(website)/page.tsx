import ToolBar from "./invoices/[id]/_components/toolbar"

export default function Home() {
  return (
    <div className="flex flex-col">
        <ToolBar
        mode="edit"
        invoiceId="demo"
        />
      <div>Welcome It Invoice App</div>
     </div>
  );
}
