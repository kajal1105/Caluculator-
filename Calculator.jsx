import { useState, useEffect } from "react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");

  useEffect(() => {
    const savedValue = localStorage.getItem("calculatorDisplay");
    if (savedValue) {
      setDisplay(savedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calculatorDisplay", display);
  }, [display]);

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setExpression("");
      return;
    }
    if (value === "=") {
      try {
        const result = eval(expression);
        setDisplay(result.toString());
        setExpression(result.toString());
      } catch {
        setDisplay("Error");
        setExpression("");
      }
      return;
    }
    const newExpression = expression + value;
    setExpression(newExpression);
    setDisplay(newExpression);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-72 bg-black p-4 rounded-lg shadow-lg">
        <div className="bg-[#4f4f4f] text-white text-right text-2xl p-3 mb-2 rounded">{display}</div>
        <div className="grid grid-cols-4 gap-2">
          {["7", "8", "9", "/", "4", "5", "6", "x", "1", "2", "3", "-", "0", ".", "=", "+", "AC", "^2"].map((btn) => (
            <button
              key={btn}
              className={`p-4 text-white text-lg rounded shadow-md ${
                ["+", "-", "x", "/", "="].includes(btn)
                  ? "bg-[#fe9f09]"
                  : btn === "AC" || btn === "^2"
                  ? "bg-[#5b5b5a]"
                  : "bg-[#737a7b]"
              }`}
              onClick={() => handleClick(btn === "x" ? "*" : btn === "^2" ? "**2" : btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;