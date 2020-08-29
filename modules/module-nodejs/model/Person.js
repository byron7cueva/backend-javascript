class Person {
  // Private propperties
  #id = ''
  #age = 0

  // Private methods
  #doubleAge = () => {
    return this.age * 2
  }

  // Public properties
  name = ''
  surname = ''

  // Constructor
  constructor(id = '') {
    this.#id = id
  }
  
  // Setter y getters
  get id () {
    return this.#id
  }

  set age (age = 0) {
    this.#age = age
  }

  get age () {
    return this.#age
  }

  // Public methods
  saludar() {
    console.log(`Hola soy ${this.name} ${this.surname}`)
  }

  toDoubleAge() {
    console.log(`My double age is ${this.#doubleAge()}`)
  }
}

export {
  Person
}