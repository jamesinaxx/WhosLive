import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useStorage } from "../../lib/chromeapi";
import { themeChange } from "theme-change";

function ColorToggle() {
  const [theme, setTheme] = useStorage<"cupcake" | "forest">("NowLive:Theme");
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <button
      className="btn btn-secondary btn-circle"
      data-toggle-theme="forest,cupcake"
      data-act-class="ACTIVECLASS"
      data-key="NowLive:Theme"
      onClick={() =>
        setTheme((theme) => (theme === "cupcake" ? "forest" : "cupcake"))
      }
    >
      {theme === "cupcake" ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ColorToggle;
