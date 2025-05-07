"use client";
export function Fab() {
  return (
    <button
      type="button"
      className="fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg p-4 md:p-5 hover:bg-primary/90 focus:ring-2 focus:ring-primary transition-all duration-200 active:scale-95"
      aria-label="Quick Action"
      style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)" }}
      onClick={() => window.navigator.vibrate?.(30)}
    >
      <span className="text-2xl md:text-3xl">+</span>
    </button>
  );
}
