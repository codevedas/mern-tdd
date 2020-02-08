import React from 'react'
import MessageList from '../components/MessageList'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme'
import mockMessages from '../__mocks__/messages.json'
Enzyme.configure({ adapter: new Adapter()})
describe('List', () => {
  it('renders without crashing', () => {
    const component = mount(<MessageList/>);
    expect(component).toMatchSnapshot();
  });
  it('takes messages as props and displays them', () => {
    const component = shallow(<MessageList messages={mockMessages}/>);
    expect(component.find('ul#message_list').length).toBe(1);
  });
  it('each message in list has delete button', () => {
    const component = mount(<MessageList messages={mockMessages}/>);
    expect(component.find('ul#message_list').childAt(0).exists('button#delete')).toBe(true);
  });
  it('each message has update button', () => {
    const component = shallow(<MessageList messages={mockMessages} loaded={true} />)
    expect(component.find('ul#message_list').childAt(0).find('#update').text()).toBe('update')
  });

  it('update click toggles edit mode', () => {
    const component = mount(<MessageList
      messages={mockMessages}
      loaded={true}
      />)
      component.find('ul#message_list').childAt(0).find('#update').simulate('click')
      expect(component.find('ul#message_list').childAt(0).find('#updateBox').text()).toBe('Hello')
      expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')
    });

  });
