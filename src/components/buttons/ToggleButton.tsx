import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../../context/ThemeContexts";
import { forwardRef } from "react";

type ToggleButtonProps = {};

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>((_, ref) => {
  const { theme, toggleTheme } = useTheme();
  
  if (theme === "dark") {
    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-white"
      >
        <SunIcon className="size-4  fill-accent-green" />
        Light
      </button>
    );
  }

  return (
    <button
      ref={ref}
      onClick={toggleTheme}
      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  hover:bg-black/10 duration-300 delay-100 dark:text-text-dark dark:hover:bg-white/10 text-text-light"
    >
      <MoonIcon className="w-4 h-4 fill-accent-green" />
      Dark
    </button>
  );
});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;