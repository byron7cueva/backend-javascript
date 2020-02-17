# Enums

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
```