import React from 'react';
// import ReactDOM from 'react-dom';
import MessageApp from '../App'
import mockAxios from '../__mocks__/axios.js'
import errorMock from '../__mocks__/error.json'
import mockMessages from '../__mocks__/messages.json'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme'

Enzyme.configure({ adapter: new Adapter()})

describe('MessageApp', () => {

  beforeEach(function(){
    mockAxios.post.mockImplementation(() =>
    Promise.resolve({
      data: []
    }));
    mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: mockMessages
    }));
    mockAxios.delete.mockImplementation(() =>
    Promise.resolve({
      data: []
    }));
  })

  afterEach(function(){
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
    mockAxios.delete.mockClear()
  })

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

  it('posts data and clears message box on submit success', () => {
    const component = mount(<MessageApp/>);
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello' } })
    component.find('form').simulate('submit')
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/message", {"content": "Hello"});
    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('');
  });

  it('Loads data from api', () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it('removes message on delete', async () => {
    const component = await mount(<MessageApp/>);
    await component.update()
    await component.find('ul#message_list').childAt(0).find('#delete').simulate('click');
    await component.update()
    expect(mockAxios.delete).toHaveBeenCalledWith("http://localhost:3001/delete/1", {"id": 1})
  });

  it('updates message on update', async () => {
    const component = await mount(<MessageApp/>);
    await component.update()
    await component.find('ul#message_list').childAt(0).find('#update').simulate('click')
    expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')
    component.find('ul#message_list').childAt(0).find('#send').simulate('click')
    expect(mockAxios.put).toHaveBeenCalledWith("http://localhost:3001/update/1", {"content": "Hello"});
    expect(component.find('textarea').text()).toEqual('');
  });

})

describe('MessageApp erroring', () => {
  beforeEach(function(){
    mockAxios.get.mockImplementationOnce(() =>
    Promise.reject(errorMock));
    mockAxios.post.mockImplementationOnce(() =>
    Promise.reject(errorMock));
    mockAxios.delete.mockImplementationOnce(() =>
    Promise.reject(errorMock));
    mockAxios.put.mockImplementationOnce(() =>
    Promise.reject(errorMock));
  });
  afterEach(function(){
    mockAxios.get.mockClear()
    mockAxios.post.mockClear()
    mockAxios.delete.mockClear()
    mockAxios.put.mockClear()
  })
  it('loads err on GET err', async () => {
    var component = await mount(<MessageApp/>);
    await component.update()
    expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
    expect(component.find('#error').text()).toBe('Error: error text from json mock');
  });
  it('loads err on Post err', async () => {
    const component = mount(<MessageApp/>);
    component.find('textarea#message_box').simulate('change', { target: { value: 'bad string' } })
    await component.find('form').simulate('submit')
    await component.update()
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
    expect(component.find('#error').text()).toBe('Error: error text from json mock');
  });
  it('loads err on delete err', async () => {
    const component = await mount(<MessageApp/>);
    component.setState({
      messages: mockMessages,
      loaded: true
    })
    await component.update()
    await component.find('ul#message_list').childAt(0).find('#delete').simulate('click');
    await component.update()
    expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
    expect(component.find('#error').text()).toBe('Error: error text from json mock');
  });
  it('loads err on update err', async () => {
    const component = await mount(<MessageApp/>);
    component.setState({
      messages: mockMessages,
      loaded: true
    })
    await component.update()
    await component.find('ul#message_list').childAt(0).find('#update').simulate('click')
    expect(component.find('ul#message_list').childAt(0).find('#send').text()).toBe('Send Update')
    component.find('ul#message_list').childAt(0).find('#send').simulate('click')
    expect(component.state().error).toEqual({"response": {"data": "error text from json mock"}});
    expect(component.find('#error').text()).toBe('Error: error text from json mock');
  });
});
