# Interfaces

Crear

```graphql
mutation createNewMonitor($monitorinput: PersonInput!) {
  createPerson(input: $monitorinput) {
    _id
    name
  }
}

{
  "monitorinput": {
    "name": "Monitor 1",
    "email": "monitor1@gmail.com",
    "phone": "123658741"
  }
}
```

Consultar

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