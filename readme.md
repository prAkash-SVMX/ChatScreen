# React Native ChatComponent

A customizable and easy-to-use React Native chat component for incorporating chat functionality into your mobile applications.

## Installation

Install the package using npm:

```bash
npm install chatscreen
```

## Usage
Import the ChatComponent into your React Native application and use it as follows:
```bash
import React, { Component } from 'react';
import ChatComponent from 'chatscreen';

class YourChatScreen extends Component {
  render() {
    return (
    <>
      {/* Your other components */}
      <ChatComponent />
    </>
    );
  }
}

export default YourChatScreen;
```
## UI

![simulator_screenshot_BADBC3ED-2EF1-41FB-B40E-D9661C083822](https://github.com/prAkash-SVMX/ChatScreen/assets/32197228/52f9f717-568b-4031-a1a0-4c203cc91f17)

## Features
Fully customizable UI
Support for sending and receiving messages
Modal for a seamless chat experience
Keyboard avoiding view for a smooth user experience


## Props
The ChatComponent accepts the following props:

headerBackgroundColor: Background color for the header.
headerTintColor: Text color for the header.
headerText: Text to display in the header.
chatViewColor: color of the chat text containr 

Example:
```bash
<ChatComponent
  headerBackgroundColor="#93cfdb"
  headerTintColor="#ffffff"
  headerText="prakash"
  chatViewColor="green"
/>
```

## Contributing

We welcome contributions! If you find any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

## Acknowledgments

Special thanks to the open-source community for their contributions and inspiration.

## Troubleshooting

You might face an  error saying  
"Invariant Violation: requireNativeComponent: "RNSVGPath" was not found in the UIManager"
to solve this you can run this 
```bash
npm install react-native-svg
```


