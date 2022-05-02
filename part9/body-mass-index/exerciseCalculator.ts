interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

const calculateExercises = (dailyHours: number[], targetHours: number): Result => {
  const avg = dailyHours.reduce((a,b) => a+b) / dailyHours.length;
  const success = avg/targetHours;
  
  let rating = 1;
  let ratingDescription = "not very good, needs some work";
  if(success >= 1) {
    rating = 3;
    ratingDescription = "great! met or exceeded the target";
  } else if (success > .75) {
    rating = 2;
    ratingDescription = "not bad, but could be better";
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(x => x > 0).length,
    success: Boolean(avg >= targetHours),
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: avg
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));