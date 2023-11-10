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

## Features
Fully customizable UI
Support for sending and receiving messages
Modal for a seamless chat experience
Keyboard avoiding view for a smooth user experience


## Props
The ChatComponent accepts the following props:

headerBackgroundColor: Background color for the header.
headerTintColor: Text color for the header.
Example:
```bash
<ChatComponent
  headerBackgroundColor="#93cfdb"
  headerTintColor="#ffffff"
/>
```

## Contributing
We welcome contributions! If you find any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

###Acknowledgments

Special thanks to the open-source community for their contributions and inspiration.

