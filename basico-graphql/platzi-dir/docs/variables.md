# Variables

```graphql
mutation CreateNewCourse($createInput: CourseInput!) {
  createCourse(input: $createInput){
    _id
    title
  }
}

{
  "createInput": {
    "title": "Mi titulo 7",
    "teacher": "Profesor 7",
    "description": "Decricion 7",
    "topic": "programacion",
    "level": "principiante"
  }
}

query GetCourse2($course: ID!) {
  getCourse(id: $course){
    _id
    title
    people{
      _id
      name
    }
  }
}

{"course": "5e4ac3fc52aedef5cbae4e79" }
```