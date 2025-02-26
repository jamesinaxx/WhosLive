import {
  useEffect,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useStorageLocal } from "../../lib/chromeapi";
import { themeChange } from "theme-change";

interface ColorToggleProps {
  shown: boolean;
}

const ColorToggle: FunctionComponent<PropsWithChildren<ColorToggleProps>> = ({
  shown,
}) => {
  const [theme, setTheme] = useStorageLocal<"cupcake" | "forest">(
    "NowLive:Theme",
  );
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <button
      className="btn btn-secondary"
      style={{ opacity: shown ? "0%" : "100%" }}
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
};

export default ColorToggle;
