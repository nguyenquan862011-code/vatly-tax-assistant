import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "button";
}

export function ThemeToggle({ className = "", variant = "icon" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Read theme from documentElement class or localStorage
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("tamgiang_theme", "dark");
      } catch (_) {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("tamgiang_theme", "light");
      } catch (_) {}
    }
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? "Chuyển sang giao diện Tối (Dark Mode)" : "Chuyển sang giao diện Sáng (Light Mode)"}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${className}`}
      >
        {theme === "light" ? (
          <>
            <Moon className="size-3.5 text-[#1558C9]" />
            <span>Chế độ Tối</span>
          </>
        ) : (
          <>
            <Sun className="size-3.5 text-[#D9F99D]" />
            <span>Chế độ Sáng</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Chuyển sang giao diện Tối (Dark Mode)" : "Chuyển sang giao diện Sáng (Light Mode)"}
      title={theme === "light" ? "Chuyển sang giao diện Tối" : "Chuyển sang giao diện Sáng"}
      className={`inline-flex items-center justify-center size-9 rounded-lg border border-border bg-card text-foreground transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${className}`}
    >
      {theme === "light" ? (
        <Moon className="size-4 text-[#1558C9] transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Sun className="size-4 text-[#2DD4BF] transition-transform duration-200 hover:rotate-45" />
      )}
    </button>
  );
}
