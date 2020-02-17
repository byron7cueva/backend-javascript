# Directives

```graphql
query getPeopleData($monitor: Boolean!, $avatar: Boolean!) {
  getPeople{
    _id
    name
    ... on Monitor @include(if: $monitor) {
      phone
    }
    ... on Student @include(if: $avatar) {
      avatar
      email
    }
  }
}

{
  "monitor": false,
  "avatar": true
}
```