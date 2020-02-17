# Unios

## Crear induce en MongoDB

Creando indice llamado text en cualquier campo, tanto en la coleccion courses y students

```javascript
db.courses.createIndex({"$**": "text"})
db.studens.createIndex({"$**": "text"})
```

## Implementar en el schema

```graphql
union GlobalSearch = Course | Student | Monitor
```

## Consulta

```graphql
{
  searchItems(keyword: "2"){
    __typename
    ... on Course {
      title
      description
    }
    
    ... on Monitor {
      name
      phone
    }
    
    ... on Student {
      name
      email
    }
  }
}
```