import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
// TODO: Default theme == system theme

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="themeToggle"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
