# Nested

```graphql
mutation {
  addPeople(courseId: "5e4ac3fc52aedef5cbae4e7a",
  personId: "5e4ae7d09e9a4b51e351727f"){
    title,
    description
  }
}
```

Con Alias

```graphql
mutation AddPersonToCourse2($course: ID!, $person: ID!){
  addPeople(courseId: $course, personId: $person) {
    _id
    title
  }
}

{"course": "5e4ac3fc52aedef5cbae4e79", "person": "5e4b0ed0e47dbabf7c7d98f5"}
```