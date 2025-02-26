import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useStorage } from "../../lib/chromeapi";
import { themeChange } from "theme-change";
import { knownThemes, Theme, themeToggleList, toggleTheme } from "../../theme";

function ColorToggle() {
  const [theme, setTheme] = useStorage<Theme>("NowLive:Theme");
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <button
      className="btn btn-secondary btn-circle"
      data-toggle-theme={themeToggleList}
      data-act-class="ACTIVECLASS"
      data-key="NowLive:Theme"
      onClick={() => setTheme(toggleTheme)}
    >
      {theme === knownThemes.light ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ColorToggle;
