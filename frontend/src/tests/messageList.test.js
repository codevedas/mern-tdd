import React from 'react'
import MessageList from '../components/MessageList'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme'
Enzyme.configure({ adapter: new Adapter()})
describe('List', () => {
it('renders without crashing', () => {
    const component = mount(<MessageList/>);
    expect(component).toMatchSnapshot();
  });
it('takes messages as props and displays them', () => {
  const component = shallow(<MessageList
    messages={[{id:1, content:'hello', date:'2000'},{id:2, content:'world', date:'2001'}]}
    />);
expect(component.find('ul#message_list').children().length).toBe(2);});
});
