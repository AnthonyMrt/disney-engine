import React from "react";
import setupTests from '../../setupTests'
import Register from "./Register";
import { mount } from 'enzyme';

describe('<Register>', function () {

  let component


  beforeEach(() => {
    component = mount(<Register />);
  });

  afterEach(() => {
    component.unmount();
  });

  it('Should capture name correctly onChange', function () {


    const input = component.find('input').at(0);
    input.instance().value = 'anthony';
    input.simulate('change');
    expect(component.find('input').at(0).props().value).toEqual('anthony');
  })

  it('Should capture email correctly onChange and change the props accordingly', function () {


    const input = component.find('input').at(1);
    input.instance().value = 'anthone97one@hotmail.com';
    input.simulate('change');
    expect(component.find('input').at(1).props().value).toEqual('anthone97one@hotmail.com');
  })


  it('Should capture password correctly on change and the state', function () {


    const input = component.find('input').at(2);
    input.instance().value = '123456';
    input.simulate('change');
    expect(component.find('input').at(2).props().value).toEqual('123456')

  })

  it('Should capture password correctly on change and the state', function () {


    const input = component.find('input').at(3);
    input.instance().value = '123456';
    input.simulate('change');
    expect(component.find('input').at(3).props().value).toEqual('123456')

  })


  describe('Inscription', () => {
    it('Should call set submitted true when submit button is clicked', function () {


      component.find('form').simulate('submit')


    })
  })

})
