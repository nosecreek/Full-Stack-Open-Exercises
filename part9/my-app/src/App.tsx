interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special",
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Part = ({part}: { part: CoursePart}) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>{part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>Project Exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>{part.description}</p>
          <p>Submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>{part.description}</p>
          <p>Required Skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return <></>;
  }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return <div>{courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}</div>;
};

const Total = (props: { courseParts: CoursePart[]}) => (
  <p>
    <strong>Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</strong>
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];
  

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;