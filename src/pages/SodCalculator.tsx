import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorInput } from "@/components/CalculatorInput";
import { CalculatorResult } from "@/components/CalculatorResult";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SodCalculator = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("feet");

  // Standard sod roll is typically 2x5 feet = 10 square feet
  const SQUARE_FEET_PER_ROLL = 10;

  const calculateSodNeeded = () => {
    if (!length || !width) return 0;

    let areaInSquareFeet;
    const lengthNum = parseFloat(length);
    const widthNum = parseFloat(width);

    // Convert area to square feet based on input unit
    switch (unit) {
      case "feet":
        areaInSquareFeet = lengthNum * widthNum;
        break;
      case "yards":
        areaInSquareFeet = lengthNum * widthNum * 9; // 1 square yard = 9 square feet
        break;
      case "meters":
        areaInSquareFeet = lengthNum * widthNum * 10.764; // 1 square meter = 10.764 square feet
        break;
      default:
        areaInSquareFeet = 0;
    }

    // Calculate number of rolls needed (rounded up)
    return Math.ceil(areaInSquareFeet / SQUARE_FEET_PER_ROLL);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculators
        </Button>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Sod Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6">
              <CalculatorInput
                label="Length"
                value={length}
                onChange={setLength}
                showUnitSelect
                selectedUnit={unit}
                onUnitChange={setUnit}
              />
              <CalculatorInput
                label="Width"
                value={width}
                onChange={setWidth}
                showUnitSelect
                selectedUnit={unit}
                onUnitChange={setUnit}
              />
            </div>

            <div className="space-y-2">
              <CalculatorResult
                label="Sod Rolls Needed"
                value={calculateSodNeeded()}
                unit="rolls"
              />
              <p className="text-sm text-gray-500 mt-2">
                Based on standard sod rolls of {SQUARE_FEET_PER_ROLL} square feet (2' × 5')
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SodCalculator;