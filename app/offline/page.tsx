import { Button } from "@/components/ui/button";
import { WifiOff } from "lucide-react";
import Link from "next/link";

/**
 * Offline fallback page for the PWA.
 * Informs the user they are offline and provides a link to the homepage.
 */
export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <WifiOff className="w-16 h-16 mb-6 text-gray-400" aria-hidden="true" />
      <h1 className="text-3xl font-bold mb-2">You're offline</h1>
      <p className="text-gray-500 mb-6" aria-live="polite">
        Please check your internet connection and try again.
      </p>
      <Link href="/">
        <Button type="button">Go to Homepage</Button>
      </Link>
    </div>
  );
}
