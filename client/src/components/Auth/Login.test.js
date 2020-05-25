import React from "react";
import setupTests from '../../setupTests'
import Login from "./Login";
import { mount } from 'enzyme';

describe('<Login>', function () {

  let component


  beforeEach(() => {
    component = mount(<Login />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('Should capture email correctly onChange and change the props accordingly', function () {


    const input = component.find('input').at(0);
    input.instance().value = 'anthone97one@hotmail.com';
    input.simulate('change');
    expect(component.find('input').at(0).props().value).toEqual('anthone97one@hotmail.com');
  })


  it('Should capture password correctly on change and the state', function () {


    const input = component.find('input').at(1);
    input.instance().value = '123456';
    input.simulate('change');
    expect(component.find('input').at(1).props().value).toEqual('123456')

  })

  describe('Connexion', () => {
    it('Should call set submitted true when submit button is clicked', function () {


      component.find('form').simulate('submit')


    })
  })

})
