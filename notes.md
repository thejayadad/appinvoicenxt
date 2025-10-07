

### SETUP ###
- package.json
- global.css | page.tsx
- daisyui
- npm i -D daisyui@latest


### STRUCTURIE ###
/app/invoices/[id]/page.tsx
/components/invoice/
  ├── index.ts                # exports main InvoiceEditor
  ├── InvoiceEditor.client.tsx
  ├── Toolbar.tsx
  ├── LineItems.tsx
  ├── PartyFields.tsx
  ├── TotalsCard.tsx
  ├── NotesSection.tsx
  ├── Sidebar.tsx
  ├── hooks/useInvoiceState.ts
  └── pdf/
      ├── InvoicePDFDoc.tsx
      └── PdfDownloadButton.client.tsx
/types/
  └── invoice.ts


### LAYOUT ###
- route grouping
- page.tsx
- setup the toolbar and center the onscreen text
- build componets and id page
- create toolbar
- bring in the toolbar in the page.tsx first
- add the types:


```
// /types/invoice.ts
export type Party = {
  name: string;
  email?: string;
  address?: string;
  phone?: string;
};

export type InvoiceItem = {
  id: string;
  description: string;
  rate: number;
  qty: number;
};

export type InvoiceData = {
  id: string;
  title: string;
  logoUrl?: string;
  from: Party;
  billTo: Party;
  number: string;
  date: string;
  status: string;
  items: InvoiceItem[];
  taxPercent: number;
  currency: string;
  notes: string;
  brand: { name: string };
};



```
--- TOOLBAR.tsx ---

```
"use client";

import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import dynamic from "next/dynamic";
import { InvoiceData } from "@/lib/types/invoice";

// Lazy-load PDF button (client-only)
// const PdfDownloadButton = dynamic(
//   () => import("@/_components/PdfDownloadReactPdf.client"),
//   { ssr: false }
// );

type Mode = "preview" | "edit";

interface ToolbarProps {
  invoiceId: string;
  mode: Mode;
  pdfData?: InvoiceData;
}

// ✅ Reusable inline style helpers
const baseBtn: React.CSSProperties = {
  textDecoration: "none",
  padding: "6px 12px",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.15s ease",
};

const iconStyle: React.CSSProperties = { marginRight: 6 };

const headerStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#fff",
  borderBottom: "1px solid #e5e7eb",
  padding: "8px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

export default function Toolbar({ invoiceId, mode, pdfData }: ToolbarProps) {
  const base = `/invoices/${invoiceId}`;
  const isPreview = mode === "preview";

  // Extracted button rendering for DRYness
  const renderNavButton = (
    href: string,
    label: string,
    active: boolean,
    Icon: React.ElementType,
    activeColor: string,
    inactiveColor: string
  ) => (
    <Link
      href={href}
      style={{
        ...baseBtn,
        backgroundColor: active ? activeColor : inactiveColor,
        color: active ? "#fff" : "#111",
      }}
    >
      <Icon size={16} style={iconStyle} />
      {label}
    </Link>
  );

  return (
    <header style={headerStyle}>
      <div style={{ display: "flex", gap: 8 }}>
        {renderNavButton(
          `${base}?mode=preview`,
          "Preview",
          isPreview,
          Eye,
          "#2563eb", // blue for preview
          "#f3f4f6"
        )}

        {renderNavButton(
          `${base}?mode=edit`,
          "Edit",
          !isPreview,
          Pencil,
          "#9ca3af", // neutral gray for edit (was blue)
          "#f3f4f6"
        )}
      </div>

      {/* ✅ Safe client-only PDF download (if provided) */}
      {/* {pdfData ? (
        <PdfDownloadButton data={pdfData} filename={`invoice-${invoiceId}.pdf`} />
      ) : (
        <div style={{ fontSize: 12, color: "#6b7280" }}>PDF not ready</div>
      )} */}
    </header>
  );
}



```

- update the links and make sure the mode changes in the url


"use client";

This tells Next.js that this file should run on the client, not the server.
In Next.js 13+ with the App Router, all components are server components by default —
so adding "use client" makes it a Client Component, which can use hooks, browser APIs, and interactivity.

import Link from "next/link";

We import the Link component from Next.js.
Unlike a regular <a> tag, this uses client-side navigation, meaning no full page reloads — it updates the route instantly while keeping the React state intact.

import { Eye, Pencil } from "lucide-react";

These are icon components from the Lucide React icon library.
Eye represents a “Preview” action, and Pencil represents “Edit”.
They’re simple SVGs that scale nicely and accept props like size and color.

import type { InvoiceData } from "@/types/invoice";

This imports our TypeScript type definition for the invoice data.
We only import the type (not the value) using import type,
which helps TypeScript know what shape the pdfData prop should have — without adding runtime code.

import dynamic from "next/dynamic";

Next.js’s dynamic() allows you to lazy-load a component on the client.
It’s useful when a component depends on the browser (like a PDF generator) and shouldn’t run on the server.

const PdfDownloadButton = dynamic(...

Here we dynamically import the PDF download button component.

const PdfDownloadButton = dynamic(
  () => import("@/_components/PdfDownloadReactPdf.client"),
  { ssr: false }
);


The arrow function tells Next.js how to import the component.

{ ssr: false } disables server-side rendering for it,
ensuring it loads only in the browser, where React-PDF can run safely.

type Mode = "preview" | "edit";

We define a TypeScript union type for the two modes the toolbar supports.
This gives us autocomplete and safety — no typos like "preivew".

interface ToolbarProps { ... }

This defines the props our Toolbar component expects:

interface ToolbarProps {
  invoiceId: string;        // unique invoice identifier, used in URLs
  mode: Mode;               // either "preview" or "edit"
  pdfData?: InvoiceData;    // optional data for PDF generation
}


The ? means pdfData is optional — sometimes we just show the toolbar before PDF is ready.

const baseBtn: React.CSSProperties = { ... }

This creates a reusable base style for all toolbar buttons.
It’s a JavaScript object with inline CSS that defines the look of each navigation button.

textDecoration: "none" removes underlines

padding adds breathing room

borderRadius makes corners round

display: "flex" and alignItems: "center" vertically center icon and text

transition smooths background-color changes (hover feedback)

const iconStyle: React.CSSProperties = { marginRight: 6 };

Just a small shared style for icons — adds space between icon and label text.

const headerStyle: React.CSSProperties = { ... };

Defines the layout of the toolbar container itself.

width: "100%" spans across the page top

backgroundColor: "#fff" makes it white

borderBottom gives a subtle divider line

padding adds spacing

display: "flex" arranges items horizontally

justifyContent: "space-between" puts buttons on the left and the PDF button on the right

position: "sticky", top: 0 makes it stay visible when scrolling

zIndex: 10 ensures it stays above page content

export default function Toolbar({ invoiceId, mode, pdfData }: ToolbarProps) {

We define the Toolbar component itself.
It takes in its props (id, mode, data) and returns JSX — the rendered toolbar UI.

const base = \/invoices/${invoiceId}`;`

We construct the base URL for this invoice — for example:
if the ID is 123, this becomes /invoices/123.

All navigation links (preview/edit) will build on this base path.

const isPreview = mode === "preview";

A simple boolean flag to know whether we’re in preview mode.
This helps us color the active button correctly.

const renderNavButton = (...) => ( ... )

This defines a helper function that returns a <Link> element.
Instead of repeating the same <Link> markup twice (for Preview and Edit),
we can call this function with different arguments.

Parameters:

href: where to link

label: button text (e.g. "Preview")

active: whether it’s currently selected

Icon: the Lucide icon component to display

activeColor: background color when active

inactiveColor: background color when inactive

Inside, it returns:

<Link
  href={href}
  style={{
    ...baseBtn,                            // start with shared styles
    backgroundColor: active ? activeColor : inactiveColor,
    color: active ? "#fff" : "#111",       // white text on active, black otherwise
  }}
>
  <Icon size={16} style={iconStyle} />     // the Lucide icon
  {label}                                 // the text label
</Link>


This pattern is DRY (Don’t Repeat Yourself) — only one function renders both buttons.

return ( ... )

Everything inside this return is what renders to the screen —
the header bar, the buttons, and the optional PDF download area.

<header style={headerStyle}>

The outer container, styled as a sticky top navigation bar.

<div style={{ display: "flex", gap: 8 }}>

A small flex container for the two buttons (“Preview” and “Edit”).
The gap: 8 adds space between them.

{renderNavButton(... "Preview" ...)}

We call our helper function to render the Preview button.

Parameters:

href = `${base}?mode=preview`
label = "Preview"
active = isPreview
Icon = Eye
activeColor = "#2563eb"   // bright blue
inactiveColor = "#f3f4f6" // light gray


If isPreview is true, this button appears blue with white text;
otherwise, it’s light gray.

{renderNavButton(... "Edit" ...)}

The second button for edit mode.

href = `${base}?mode=edit`
label = "Edit"
active = !isPreview
Icon = Pencil
activeColor = "#9ca3af"   // neutral gray
inactiveColor = "#f3f4f6"


So when we’re not in preview mode, the Edit button turns gray and active.

{pdfData ? ( <PdfDownloadButton ... /> ) : ( ... )}

Now, on the right side of the toolbar, we render the PDF download button if
we have the invoice data available (pdfData prop is defined).

Otherwise, we show a placeholder message:

<div style={{ fontSize: 12, color: "#6b7280" }}>PDF not ready</div>


This avoids runtime errors and tells the user that the PDF can’t be generated yet.

<PdfDownloadButton data={pdfData} filename={...} />

This is your lazy-loaded PDF download component.
It takes two props:

data: the invoice information to include in the PDF

filename: the name of the downloaded file (e.g. invoice-123.pdf)

Because we imported it dynamically with { ssr: false },
it only runs in the browser — so we don’t get the “PDFDownloadLink is a web-specific API” error.

</header>

Closes the main toolbar container.

✅ TL;DR Summary
Concept	Explanation
"use client"	Makes this component interactive in the browser
dynamic(..., { ssr: false })	Prevents server from rendering PDF logic
renderNavButton()	Eliminates duplicate button code
baseBtn, iconStyle, headerStyle	Centralized shared style objects
isPreview	Determines which mode is active
Two buttons (Preview / Edit)	Toggle between UI modes by updating query param
Conditional PDF button	Renders download option only if data is available
Neutral Edit color	Replaces bright blue with subtle gray for clarity
🧩 Big Picture

This component is stateless and modular:

It doesn’t manage invoice logic — just navigation and UI.

It receives everything as props, making it easy to reuse.

It separates design from logic using style constants and helper functions.


### SINGLE INVOICE PAGE ###
- 