import { useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useStorageLocal } from "../../lib/chromeapi";
import { themeChange } from "theme-change";

function ColorToggle() {
  const [theme, setTheme] = useStorageLocal<"cupcake" | "forest">(
    "NowLive:Theme",
  );
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <button
      className="btn btn-secondary"
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
