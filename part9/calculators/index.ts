import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if(isNaN(weight) || isNaN(height)) {
    res.json({error:'Provided values were not numbers!'});
  } else {
    const bmi = calculateBmi(height, weight);
    res.json(bmi);
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let { daily_exercises, target } = req.body;
  if(!daily_exercises || !target) {
    res.json({error:'Missing values'});
  }

  if(!Array.isArray(daily_exercises)) {
    res.json({error:'Daily exercises must be an array'});
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  daily_exercises = daily_exercises.map((x:any)=> {
    const n = Number(x);
    if(isNaN(n)) {
      res.json({error:'Provided values were not numbers!'});
    }
    return n;
  });
  target = Number(target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if(isNaN(target)) { res.json({error:'Provided values were not numbers!'}); }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});