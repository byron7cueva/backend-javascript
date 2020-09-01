import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Hello from '../components/Hello';

Enzyme.configure({
  adapter: new Adapter()
});

describe('Añadiendo pruebas a React', () => {
  test('Comprobamos el texto que recibe por prop', () => {
    // La data que recibe
    const data = { title: 'Hola mundo' };
    // Wrapper para poder montar el componente
    const wrapper = mount(
      <Hello title={data.title} />
    );
    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('Hola mundos');
  });
});