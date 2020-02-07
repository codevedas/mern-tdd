import React from 'react';
// import ReactDOM from 'react-dom';
import MessageApp from './App'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme'
Enzyme.configure({ adapter: new Adapter()})
describe('App',() => {
  it('renders without crashing', () => {
    const component = mount(<MessageApp/>);
    expect(component).toMatchSnapshot();
  });
it('has textbox', () => {
  const component = mount(<MessageApp/>);
  expect(component.exists('textarea#message_box')).toBe(true);
});
it('has submit button', () => {
  const component = mount(<MessageApp/>);
  expect(component.exists('button#submit')).toBe(true);
});
it('has message list', () => {
  const component = mount(<MessageApp/>);
  expect(component.exists('ul#message_list')).toBe(true);
});
})
