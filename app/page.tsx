import { Converter } from "@/components/converter";
/**
 * Home page for the Unit Converter PWA.
 * Renders the main converter UI.
 */
export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between"
      aria-label="Unit Converter Main Content"
    >
      <h1 className="sr-only">Unit & Currency Converter</h1>
      <Converter />
    </main>
  );
}
