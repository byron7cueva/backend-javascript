# Mutation

Mitation creaación

```graphql
mutation {
  createCourse(input: {
    title: "Curso de ejemplo 7",
    description: "Descripcion 7",
    topic: "diseño"
  }){
    _id
    title
    description
  }
}
```

Mutation edición

```graphql
mutation {
  editCourse(_id: "5e4ad02d62c2bd3e7449b485", input: {
    title: "Titulo 5"
    description: "Descripcion 5"
  }){
    _id
    title
    description
  }
}
```

Mutation Delete

```graphql
mutation {
  deleteCourse(_id:"5e4ac3fc52aedef5cbae4e78")
}
```