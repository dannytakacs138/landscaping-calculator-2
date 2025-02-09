import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculatorInput } from "@/components/CalculatorInput";
import { CalculatorResult } from "@/components/CalculatorResult";
import { Button } from "@/components/ui/button";
import { Sprout, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GrassSeedCalculator = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [unit, setUnit] = useState("feet");

  // Standard coverage rate: 2-3 pounds per 1000 square feet
  const COVERAGE_RATE = 2.5; // pounds per 1000 square feet

  const calculateSeedNeeded = () => {
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

    // Calculate seed needed (pounds)
    return (areaInSquareFeet / 1000) * COVERAGE_RATE;
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
              <Sprout className="h-6 w-6 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Grass Seed Calculator</CardTitle>
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
                label="Grass Seed Needed"
                value={calculateSeedNeeded()}
                unit="lbs"
              />
              <p className="text-sm text-gray-500 mt-2">
                Based on a coverage rate of {COVERAGE_RATE} pounds per 1,000 square feet
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrassSeedCalculator;