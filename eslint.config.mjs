import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["_strategy/**", "public/**", "node_modules/**", ".next/**"] },
  ...nextVitals,
  ...nextTypescript
];

export default eslintConfig;
