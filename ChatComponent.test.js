import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ChatComponent from './ChatComponent';

describe('ChatComponent', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ChatComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles input changes correctly', () => {
    const wrapper = shallow(<ChatComponent />);
    const input = wrapper.find('TextInput');
    input.simulate('changeText', 'New Message');
    expect(wrapper.state('inputValue')).toEqual('New Message');
  });

  it('handles submit editing correctly', () => {
    const wrapper = shallow(<ChatComponent />);
    wrapper.setState({ inputValue: 'New Message' });
    const sendIcon = wrapper.find('Icon[name="send-button"]');
    sendIcon.simulate('press');
    expect(wrapper.state('data')).toHaveLength(4); // Assuming initial data has 3 items
    expect(wrapper.state('inputValue')).toEqual('');
  });

  it('toggles visibility correctly', () => {
    const wrapper = shallow(<ChatComponent />);
    const text = wrapper.find('Text');
    text.simulate('press');
    expect(wrapper.state('modelVisible')).toBe(true);
  });
});
