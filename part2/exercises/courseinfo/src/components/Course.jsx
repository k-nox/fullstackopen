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

export default Course;
