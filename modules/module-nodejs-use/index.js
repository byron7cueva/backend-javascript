import { addTwo } from './addTwo.mjs';
import { Person } from 'module-nodejs/model'
import { PersonDao } from 'module-nodejs/dao'

// Prints: 6
console.log(addTwo(4));
const person = new Person('1')
console.log(person.id)
person.name = 'Luis'
person.surname = 'Perez'
person.age = 20
PersonDao.save(person)
person.saludar()
person.toDoubleAge()