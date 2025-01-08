const Header = ({ text }) => <h2>{text}</h2>;

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, part) => {
    return (sum += part.exercises);
  }, 0);

  return (
    <p>
      <strong>total of {sum} exercises</strong>{' '}
    </p>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const partComponents = parts.map((part) => (
    <Part key={part.id} part={part} />
  ));
  return <>{partComponents}</>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const courseComponents = courses.map((course) => (
    <Course key={course.id} course={course} />
  ));

  return (
    <>
      <h1>Web devlopment curriculum</h1>
      {courseComponents}
    </>
  );
};

export default App;