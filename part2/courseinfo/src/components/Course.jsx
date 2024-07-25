const Header = ({ course }) => <h1>{course}</h1>

const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => 
    <div>
      {parts.map(part => <Part key={part.name} part={part} />)}
    </div>
  
const Total = ({ total }) => <p><strong>total of {total} exercises</strong></p>
const Course = (course) => {

    const total = course.course.parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        <Header course={course.course.name} />
        <Content parts={course.course.parts} />
        <Total total={total} />
      </div>
    )
  }

  export default Course;