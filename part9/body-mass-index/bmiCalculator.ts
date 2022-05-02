const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const a: number = Number(process.argv[2]);
  const b: number = Number(process.argv[3]);
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