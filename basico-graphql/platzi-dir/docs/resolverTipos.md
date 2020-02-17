# Resolver de tipos

```graphql
{
 getCourses{
  _id
  title
  description
  topic
  people{
    _id
    name
    email
  }
 } 
}
```