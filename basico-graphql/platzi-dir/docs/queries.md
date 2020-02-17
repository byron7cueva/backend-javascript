# Queries

```graphql
{
  getCourses{
    _id
    title
    description
  }
}
```
Query con argumentos

```graphql
{
  getCourse(id: "5e4ac3fc52aedef5cbae4e78") {
    _id
    title
    description
  }
}

```