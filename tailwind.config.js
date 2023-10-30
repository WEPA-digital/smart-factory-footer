module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nexa: ["Nexa", "sans-serif"],
        "nexa-text": ['"Nexa Text"', "sans-serif"],
        sans: ['"Nexa Text"', "sans-serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      colors: {
        "blue-deep": {
          100: "#002D55",
          90: "#2D4C6F",
          80: "#486080",
          70: "#627691",
          60: "#7A8BA1",
          50: "#A9B4C2",
          40: "#A9B4C2",
          30: "#C0C6D1",
          20: "#D5DAE0",
          10: "#EAECEF",
        },
        "blue-medium": {
          100: "#0064AA",
          90: "#497DB7",
          80: "#608CBF",
          70: "#759CC7",
          60: "#8AABCF",
          50: "#9EB9D8",
          40: "#B3C7E0",
          30: "#C6D6E7",
          20: "#D9E4EF",
          10: "#ECF1F7",
        },
        "blue-light": {
          100: "#96D2DC",
          90: "#B5DAE2",
          80: "#BDDEE4",
          70: "#C6E1E8",
          60: "#CFE7EB",
          50: "#D6EAEF",
          40: "#DFF0F2",
          30: "#E7F4F5",
          20: "#EFF7F9",
          10: "#F7FBFC",
        },
        "blue-higlight": "#2A63F6",
        "yellow-signal": {
          100: "#DCF500",
          25: "#F6FDBF",
        },
        green: {
          100: "#009B82",
          25: "#BFE6E0",
        },
        orange: {
          100: "#F59518",
        },
        "red-signal": {
          100: "#FF0028",
          25: "#FFBFC9",
        },
        pink: {
          100: "#FACDBE",
        },
        grey: {
          100: "#828282",
        },
        "grey-light": {
          100: "#DEE2E6",
          75: "#F5F7F8",
          50: "#EDEEF1",
          25: "#F5F7F8",
        },
        black: "#212529",
        white: "#FFFFFF",
      },
      boxShadow: {
        lg: "0px 4px 16px rgba(112, 144, 176, 0.16);",
        "border-blue-deep": "0 1px 0 0 #002D55",
        top: "0px -4px 12px rgba(33, 37, 41, 0.1)",
        "top-lg": "0px -4px 12px rgba(33, 37, 41, 0.1)",
        "fake-border-right": "inset -1px 0 0  #DEE2E6",
        left: "-12px 0px 32px rgba(0, 45, 85, 0.2)",
        table: "0px 4px 8px 3px rgba(0, 45, 85, 0.08), 0px 1px 3px rgba(0, 45, 85, 0.16)",
      },
      dropShadow: {
        button: "0px 1px 2px rgba(0, 45, 85, 0.08)",
      },
      borderRadius: {
        DEFAULT: "3px",
      },
      backgroundImage: {
        "gradient-blue-deep": "linear-gradient(68.42deg, #002D55 14.17%, #004B73 85.83%);",
        "gradient-blue-medium": "linear-gradient(68.42deg, #0064AA 14.17%, #008CD2 85.83%);",
        "gradient-blue-light": "linear-gradient(68.42deg, #96D2DC 14.17%, #BEFAFA 85.83%);",
      },
      scale: {
        "-100": "-1",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
