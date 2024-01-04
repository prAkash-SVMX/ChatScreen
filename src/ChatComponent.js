import React, { Component } from "react";
import Icon from "react-native-ico-material-design";
import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Platform,
  View,
  Modal,
} from "react-native";
import Color from "./color";
import FontSize from "./fontsize";
class ChatComponent extends Component {
  constructor(props: Object) {
    super(props);

    // Initial state of the component
    this.state = {

      
      textInputHeight: 40,
      inputValue: "",
      refreshing: false,
      modelVisible: false,
      data: [], // Array to store chat data
    };
  }

  // Function to handle text input submission
  _onSubmitEditing = () => {
    const newInputValue = this.state.inputValue.trim();
    if (newInputValue) {
      const newData = this.state.data;
      // Adding a new chat message to the beginning of the data array
      newData.unshift({ id: Math.random(), title: newInputValue });
      this.setState({ data: newData, inputValue: "" });
    }
  };

  // Function to render a single row (message) in the chat
  _renderRow = (id, sender, message) => {
    const chatViewColor =
      this.props.chatViewColor || styles.messageCell.backgroundColor;
    return (
      <MessageCell
        chatViewColor={chatViewColor}
        key={`cell-${id}`}
        sender={sender}
        message={message}
      />
    );
  };

  // Function to toggle the visibility of the modal
  setVisible = (visibility) => {
    const visible = this.state.modelVisible;
    this.setState({ ...this.state, modelVisible: !visible });
  };

  // Function to handle the "Enter" key press event
  handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      this._onSubmitEditing();
    }
  };

  // Render method for the ChatComponent
  render() {
    const visible = this.state.modelVisible;
    const headerBackgroundColor =
      this.props.headerBackgroundColor || styles.headerContent.backgroundColor;
    const headerTintColor =
      this.props.headerTintColor || styles.headerText.color;
    const headerText = this.props.headerText || "Chat";

    // Content when the modal is not visible
    let withoutModel = (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text onPress={this.setVisible}>visible</Text>
      </View>
    );
    //view for android and windows
    let withModel = (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.container}>
          {/* Header of the modal */}
          <View
            style={[
              styles.headerContent,
              { backgroundColor: headerBackgroundColor },
            ]}
          >
            <View>
              {/* Header text */}
              <View style={{ marginLeft: "65%" }}>
                <Text style={[styles.headerText, { color: headerTintColor }]}>
                  {headerText}
                </Text>
              </View>
            </View>
            {/* Close button */}
            <Icon
              name="close-button"
              height="16"
              width="16"
              style={styles.closeIcon}
              onPress={this.setVisible}
            />
          </View>

          {/* Content of the modal */}
          <View style={styles.contentView}>
            {console.log(this.state.data)}
            {/* FlatList to render chat messages */}
            <FlatList
              data={this.state.data}
              renderItem={({ item }) =>
                this._renderRow(item.id, true, item.title)
              }
              keyExtractor={(item) => item.id}
              inverted={true}
            />
          </View>

          {/* Input container for typing and sending messages */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  marginLeft: 10,
                  height: Math.max(
                    40,
                    this.state.textInputHeight < 180
                      ? this.state.textInputHeight
                      : 180
                  ),
                },
              ]}
              multiline={true}
              controlled={true}
              underlineColorAndroid="transparent"
              returnKeyType="default"
              value={this.state.inputValue}
              placeholder="Type here to send message"
              // ios only
              returnKeyType="done"
              onKeyPress={this.handleKeyDown}
              enablesReturnKeyAutomatically={true}
              onContentSizeChange={(event) => {
                this.setState({
                  textInputHeight: event.nativeEvent.contentSize.height,
                });
              }}
              onChangeText={(text) => {
                this.setState({ inputValue: text });
              }}
            />

            <Icon
              name="send-button"
              height="30"
              width="30"
              color="#565959"
              style={styles.sendIcon}
              onPress={this._onSubmitEditing}
            />
          </View>
        </View>
      </Modal>
    );
    // Determine the content based on the platform and modal visibility
    let content = this.state.modelVisible === true ? withModel : withoutModel;

    // Return the content for ios
    if (Platform.OS === "ios" && this.state.modelVisible) {
      return (
        <Modal animationType="slide" transparent={true} visible={visible}>
          {/* KeyboardAvoidingView for iOS to adjust the view when the keyboard is displayed */}
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.KeyboardAvoidingView}
          >
            <View style={styles.container}>
              {/* Header of the modal */}
              <View
                style={[
                  styles.headerContent,
                  { backgroundColor: headerBackgroundColor },
                ]}
              >
                <View>
                  {/* Header text */}
                  <View style={{ marginLeft: "65%" }}>
                    <Text
                      style={[styles.headerText, { color: headerTintColor }]}
                    >
                      {headerText}
                    </Text>
                  </View>
                </View>
                {/* Close button */}
                <Icon
                  name="close-button"
                  height="16"
                  width="16"
                  style={styles.closeIcon}
                  onPress={this.setVisible}
                />
              </View>

              {/* Content of the modal */}
              <View style={styles.contentView}>
                {console.log(this.state.data)}
                {/* FlatList to render chat messages */}
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) =>
                    this._renderRow(item.id, true, item.title)
                  }
                  keyExtractor={(item) => item.id}
                  inverted={true}
                />
              </View>

              {/* Input container for typing and sending messages */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      marginLeft: 10,
                      height: Math.max(
                        40,
                        this.state.textInputHeight < 180
                          ? this.state.textInputHeight
                          : 180
                      ),
                    },
                  ]}
                  multiline={true}
                  controlled={true}
                  underlineColorAndroid="transparent"
                  returnKeyType="default"
                  value={this.state.inputValue}
                  placeholder="Type here to send message"
                  // ios only
                  returnKeyType="done"
                  onKeyPress={this.handleKeyDown}
                  enablesReturnKeyAutomatically={true}
                  onContentSizeChange={(event) => {
                    this.setState({
                      textInputHeight: event.nativeEvent.contentSize.height,
                    });
                  }}
                  onChangeText={(text) => {
                    this.setState({ inputValue: text });
                  }}
                />

                <Icon
                  name="send-button"
                  height="30"
                  width="30"
                  color="#565959"
                  style={styles.sendIcon}
                  onPress={this._onSubmitEditing}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      );
    } else {
      return content;
    }
  }
}

// MessageCell component for rendering individual chat messages
class MessageCell extends Component {
  render() {
    let { chatViewColor, message } = this.props;
    return (
      <View style={[styles.messageCell, { backgroundColor: chatViewColor }]}>
        <Text style={[styles.messageCellText]}>{message}</Text>
        <View
          style={[styles.rightArrow, { backgroundColor: chatViewColor }]}
        ></View>
        <View style={styles.rightArrowOverlap}></View>
      </View>
    );
  }
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Color.BackgroundGrey,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerContent: {
    paddingTop: 50,
    flexDirection: "row",
    height: "30",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#93cfdb",
  },
  headerText: {
    fontSize: FontSize.Content,
    fontWeight: "bold",
    color: "#ffff",
  },
  bottomToolBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Color.LittleGrey,
  },
  sendButton: {
    marginHorizontal: 10,
    backgroundColor: Color.WechatGreen,
    borderColor: Color.WechatGreen,
  },
  sendButtonText: {
    color: Color.White,
  },
  input: {
    flex: 1,
    color: Color.Black,
    fontSize: FontSize.Main,
    backgroundColor: "#d7dcde",
    borderRadius: 10,
    textAlign: "center",
    padding: 10,
  },
  messageCell: {
    backgroundColor: "#0078fe",
    padding: 10,
    marginLeft: "45%",
    borderRadius: 5,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: "50%",
    alignSelf: "flex-end",
    borderRadius: 20,
  },
  messageCellText: {
    fontSize: FontSize.Content,
    color: Color.White,
  },
  closeIcon: {
    margin: 20,
  },
  sendIcon: {
    margin: 10,
  },
  rightArrow: {
    position: "absolute",
    backgroundColor: "#0078fe",
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
  avatar: {
    borderRadius: 4,
    margin: 5,
    width: 40,
    height: 40,
  },
  contentView: {
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    overflow: "hidden",
    flex: 1,
    margin: 5,
    justifyContent: "center",
  },
  chatSendContainer: {
    justifyContent: "flex-start",
    flex: 2,
  },

  endBlankBlock: {
    position: "absolute",
    backgroundColor: "#eeeeee",
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
});

export default ChatComponent;
