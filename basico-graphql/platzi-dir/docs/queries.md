# Queries ejecutadas en el curso

## Alias y Fragments
```graphql
{
  AllCourses: getCourses{
    ...CourseFields
  }
  
  Couse1: getCourse(id: "5e4ac3fc52aedef5cbae4e79"){
    ...CourseFields
    teacher
  }
  
  Course2: getCourse(id: "5e4ac3fc52aedef5cbae4e7a"){
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people{
    _id
    name
  }
}
```