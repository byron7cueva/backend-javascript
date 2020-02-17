# Interfaces

```graphql
{
  getPeople{
    _id
    name
    email
    ... on Monitor {
      phone
    }
    
    ... on Student {
      avatar
    }
  }
}
```