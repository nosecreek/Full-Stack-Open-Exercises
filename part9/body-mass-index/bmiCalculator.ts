interface BMI {
  weight: number,
  height: number,
  bmi: string
}

export const calculateBmi = (height: number, weight: number): BMI => {
  
  const bmi = weight / (height / 100) ** 2;
  const output = {
    weight: weight,
    height: height,
    bmi: "Obese (Class III)"
  };
  if (bmi < 16) {
    output.bmi = "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    output.bmi = "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    output.bmi = "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    output.bmi = "Normal range";
  } else if (bmi < 30) {
    output.bmi = "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    output.bmi = "Obese (Class I)";
  } else if (bmi < 40) {
    output.bmi = "Obese (Class II)";
  }

  return output;
};

try {
  const a = Number(process.argv[2]);
  const b = Number(process.argv[3]);
  if(isNaN(a) || isNaN(b)) {
    throw new Error('Provided values were not numbers!');
  }

  console.log(calculateBmi(a, b));
} catch (error: unknown) {
  let errorMessage = 'Error! ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}