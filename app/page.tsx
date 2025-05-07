import { Converter } from "@/components/converter";
/**
 * Home page for the Unit Converter PWA.
 * Renders the main converter UI.
 */
export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between min-h-screen"
      aria-label="Unit Converter Main Content"
    >
      <h1 className="sr-only">Unit & Currency Converter</h1>
      <Converter />
    </main>
  );
}
