import React from 'react';

import * as Routes from '../../config/navigation/routesBuilder';
import {
  ScrollView,
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ListView,
  Dimensions,
  StatusBar,
  StyleSheet
} from 'react-native';

import {
  RkCard,
  RkText,
  RkTextInput,
  RkButton,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';

import {GradientButton} from '../../components/';
import {Walkthrough} from '../../components/walkthrough';
import {Walkthrough1} from '../walkthroughs/walkthrough1';
import {Walkthrough2} from '../walkthroughs/walkthrough2';
import {LoginV2} from '../login/login2';
//import {PaginationIndicator} from '../../components';
import {Upgrade} from '../theme/upgrade';
import {Cart} from '../other/cart';
import {data} from '../../data';

let moment = require('moment');

import {FontAwesome} from '../../assets/icons';
import {
  ProgressChart,
  DoughnutChart,
  AreaChart,
  AreaSmoothedChart,
  Avatar,
  SocialBar,
  PaginationIndicator,
  RkSwitch,
  FindFriends
} from '../../components/';


import {FontIcons} from '../../assets/icons';
const paddingValue = 8;

import {NavigationActions} from 'react-navigation';


export class Articles4 extends React.Component {
  static navigationOptions = {
    title: 'Energy Solution'.toUpperCase()
  };

  constructor(props) {
    super(props);
    //1. call the function to get the list of items
    this.getServices();
    this.pic = 'https://www.servicechampions.net/wp-content/uploads/2015/03/air-ducts-energy-star.jpg';//'https://static1.squarespace.com/static/58588d72e6f2e1e1d54aa8e4/t/5876d0da03596ef4262a5362/1484181726567/Icon+Clean+Tech+darkgreen.png';
    //2.Define the array to store the list
    this.state = {
       serviceList : []
    };
    //3. bind renderItem to call _renderItem function to render each item in the list
   this.renderItem = this._renderItem.bind(this);
  }

  //4. write the function to get the list from backend
  getServices = () => {
      console.log("Inside getServices");
      fetch('https://cmpe235-finalproject.herokuapp.com/v1/service', {
         method: 'GET'
      })
      .then(response => {
        console.log("response:"+JSON.stringify(response));
        var obj= {};
        //parse the response - get response from response._bodyInit
        obj= JSON.parse(JSON.stringify(response));
        var bodyInit = JSON.parse(obj._bodyInit);
        this.obj = bodyInit.obj;
        for (i = 0; i < this.obj.length; i++) {
          this.obj[i].photo = 'https://raw.githubusercontent.com/snehakasetty224/images/master/'+this.obj[i].header+'.png';
        }
        var item = {};
        item = JSON.stringify(this.obj);
        console.log("response1:"+ JSON.stringify(item));
        console.log("response obj"+item.id);
        console.log("response obj1 "+this.obj[0].photo);
        //5. set the array from the response to the list
        this.setState({
          //isLoading: false,
          serviceList : this.obj
        });

      })
      .catch((error) => {
         console.error(error);
      });
   }

  _keyExtractor(post) {
    return post.id;
  }

  _renderItem(info) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('ScheduleService', {id: info.item.id})}>
        <RkCard rkType='horizontal' style={styles.card}>
          <Image rkCardImg source={{ uri: info.item.photo}}/>

          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>{info.item.header}</RkText>
            <RkText rkType='secondary6 hintColor'></RkText>
            <RkButton style={{marginLeft: 85, width:150}} onPress={() => this.props.navigation.navigate('ScheduleService',{id: info.item.id})}>{info.item.status}</RkButton>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'></RkText>
          </View>
          <View rkCardFooter>
            <SocialBar rkType='space' showLabel={true}/>
          </View >
        </RkCard>
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <FlatList
        //6. Set the data for the flat list
          data={this.state.serviceList}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
      </View>
    )
  }
}


let styles = RkStyleSheet.create(theme => ({

  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },root: {
    backgroundColor: theme.colors.screen.scroll,
    padding: paddingValue,
  },screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 15,
    paddingVertical: 28,
    flex: 1,
  },
  menuButtons: {
    marginLeft: 120,
    width:150,
    padding: 15,
    borderColor: theme.colors.border.solid,
    flex: 1,
    paddingVertical: 24
  },
  icon: {
    marginBottom: 16
  },
  text: {
    flexDirection: 'row'
  },wrapper: {
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
  },
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },

  statItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  statItemIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  statItemValue: {
    color: 'white',
  },
  statItemName: {
    color: 'white',
  },
  chartBlock: {
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center'
  },container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  switch: {
    marginVertical: 14
  },
}));
