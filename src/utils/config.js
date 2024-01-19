const BG_COLORS = Object.freeze({
    HTML: "#FFF1E9",
    CSS: "#E0FDEF",
    JavaScript: "#EBF0FF",
    Accessibility: "#F6E7FF",
});

import resolveConfig from "tailwindcss/resolveConfig.js";
import myConfig from "./../../tailwind.config";

const tailwindConfig = resolveConfig(myConfig);

export { BG_COLORS, tailwindConfig };
