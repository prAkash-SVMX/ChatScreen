import React, { Component } from 'react';
import Icon from 'react-native-ico-material-design';
import {
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TextInput,
  Platform,
  View,
  Modal,
} from 'react-native';
import Color from './color';
import FontSize from './fontsize';
class ChatComponent extends Component {
  constructor(props: Object) {
    super(props);

    this.state = {
      textInputHeight: 40,
      inputValue: '',
      refreshing: false,
      modelVisible: false,
      data: [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
      ],
    };
  }

  _onSubmitEditing = () => {
    const newInputValue = this.state.inputValue.trim();
    if (newInputValue) {
      const newData = this.state.data;
      newData.unshift({ id: Math.random(), title: newInputValue });
      this.setState({ data: newData, inputValue: '', });
    }
  };
  _renderRow = (id, sender, message) => {
    return <MessageCell key={`cell-${id}`} sender={sender} message={message} />;
  };
  setVisible = visibility => {
    const visible = this.state.modelVisible;
    this.setState({ ...this.state, modelVisible: !visible });
  };
  handleKeyDown = e => {
    if (e.nativeEvent.key == 'Enter') {
      this._onSubmitEditing();
    }
  };
  render() {
    const visible = this.state.modelVisible;
    debugger
    const headerBackgroundColor=this.props.headerBackgroundColor || styles.headerContent.backgroundColor;
    const headerTintColor= this.props.headerTintColor || styles.headerText.color;
    let withoutModel = (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text onPress={this.setVisible}>visible</Text>
      </View>
    );
    let withModel = (
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.container}>
          <View
            style={[styles.headerContent,{backgroundColor:headerBackgroundColor}]}>
            <View>
              <>
                {/* {//<Image source={require('./user.png')}></Image>
        } */}
                <View style={{ marginLeft: '65%' }}>
                  <Text style={[styles.headerText,{color:headerTintColor}]}>Text</Text>
                </View>
              </>
            </View>
            <Icon
              name="close-button"
              height="16"
              width="16"
              style={styles.closeIcon}
              onPress={this.setVisible}
            />
          </View>
          <View style={styles.contentView}>
            {console.log(this.state.data)}
            <FlatList
              data={this.state.data}
              renderItem={({ item }) =>
                this._renderRow(item.id, true, item.title)
              }
              keyExtractor={item => item.id}
              inverted={true}
            />
          </View>
          <View
            style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  marginLeft: 10,
                  height: Math.max(
                    40,
                    this.state.textInputHeight < 180
                      ? this.state.textInputHeight
                      : 180,
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
              onContentSizeChange={event => {
                this.setState({
                  textInputHeight: event.nativeEvent.contentSize.height,
                });
              }}
              onChangeText={text => {
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
    let content = this.state.modelVisible === true ? withModel : withoutModel;
    if (Platform.OS === 'ios' && this.state.modelVisible) {
      return (
        <Modal animationType="slide" transparent={true} visible={visible}>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.KeyboardAvoidingView}>
            <View style={styles.container}>
              <View
                style={[styles.headerContent,{backgroundColor:headerBackgroundColor}]}>
                <View>

                  <View style={{ marginLeft: '65%' }}>
                    <Text style={[styles.headerText,{color:headerTintColor}]}>Text</Text>
                  </View>

                </View>
                <Icon
                  name="close-button"
                  height="16"
                  width="16"
                  style={styles.closeIcon}
                  onPress={this.setVisible}
                />
              </View>
              <View style={styles.contentView}>
                {console.log(this.state.data)}
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) =>
                    this._renderRow(item.id, true, item.title)
                  }
                  keyExtractor={item => item.id}
                  inverted={true}
                />
              </View>
              <View
                style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      marginLeft: 10,
                      height: Math.max(
                        40,
                        this.state.textInputHeight < 180
                          ? this.state.textInputHeight
                          : 180,
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
                  onContentSizeChange={event => {
                    this.setState({
                      textInputHeight: event.nativeEvent.contentSize.height,
                    });
                  }}
                  onChangeText={text => {
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
class MessageCell extends Component {
  render() {
    let { sender, message } = this.props;

    let differentStyle = {};
    if (sender) {
      differentStyle = {
        flexDirection: 'row-reverse',
        backgroundColor: '#0078fe',
      };
    } else {
      differentStyle = {
        flexDirection: 'row',
        backgroundColor: '#0078fe',
      };
    }
    return (
      <View
        style={styles.messageCell}>
        <Text style={styles.messageCellText}>{message}</Text>
        <View style={styles.rightArrow}></View>
        <View style={styles.rightArrowOverlap}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Color.BackgroundGrey,
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    paddingTop: 50,
    flexDirection: 'row',
    height: '30',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#93cfdb',
  },
  headerText: {
    fontSize: FontSize.Content,
    fontWeight: "bold",
    color:'#ffff'
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#d7dcde',
    borderRadius: 10,
    textAlign: 'center',
    padding: 10,
  },
  messageCell: {
    backgroundColor: '#0078fe',
    padding: 10,
    marginLeft: '45%',
    borderRadius: 5,
    marginTop: 5,
    marginRight: '5%',
    maxWidth: '50%',
    alignSelf: 'flex-end',
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
    position: 'absolute',
    backgroundColor: '#0078fe',
    //backgroundColor:"red",
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 25,
    right: -10,
  },

  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
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
    overflow: 'hidden',
    flex: 1,
    margin: 5,
    justifyContent: 'center',
  },
  chatSendContainer: {
    justifyContent: 'flex-start',
    flex: 2,
  },

  endBlankBlock: {
    position: 'absolute',
    backgroundColor: '#eeeeee',
    //backgroundColor:"green",
    width: 20,
    height: 35,
    bottom: -6,
    borderBottomLeftRadius: 18,
    right: -20,
  },
});

export default ChatComponent;
