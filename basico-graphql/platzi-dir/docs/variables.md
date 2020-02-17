# Variables

```graphql
mutation AddPersonToCourse2($course: ID!, $person: ID!){
  addPeople(courseId: $course, personId: $person) {
    _id
    title
  }
}

{"course": "5e4ac3fc52aedef5cbae4e79", "person": "5e4b0ed0e47dbabf7c7d98f5"}

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