interface HeaderProps {
  name: string
}

interface CourseParts {
  courseParts: {
    name: string,
    exerciseCount: number
  }[]
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

const Content = ({courseParts}: CourseParts) => {
  return <div>{courseParts.map((part) => (
      <p key={part.name}>{part.name} {part.exerciseCount}</p>
    ))}</div>;
};

const Total = (props: CourseParts) => (
  <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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