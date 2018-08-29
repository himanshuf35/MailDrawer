
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SectionList,TouchableOpacity,Image,FlatList} from 'react-native';
import {DrawerLayoutAndroid} from 'react-native'
import {Mail} from './Mail'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class App extends Component {
  Ref;
  constructor(props)
  {
    super(props)
    let Data=require('./MailData.json')
    this.state={
      hide:true,
      data:Data,
      titleSelected:'',
      SelectedMailType:[],
      MailType:'',
      filterValue:false,
      title:'Mail'
    }
  }
  render() {
    var navigationView = (
      <View style={styles.drawerContainer}>
      <FlatList
      extraData={this.state}
        data={this.state.data.Inbox}
        renderItem={({item})=>{
          if(this.state.hide)
          {
            return null
          }
          else{
            return(
            <TouchableOpacity style={styles.textContainer}onPress={()=>{
              this.setState({MailType:"IN"})
              if(item === "Primary")
              {
                this.setState({SelectedMailType:this.state.data.Primary,title:"Primary"})
              }
              if(item === "Social")
              {
                this.setState({SelectedMailType:this.state.data.Social,title:"Social"})
              }
              if(item === "Promotion")
              {
                this.setState({SelectedMailType:this.state.data.Promotion,title:"Promotion"})
              }

              
              this.Ref.closeDrawer();
              }}>
            <Text style={styles.listText}>{item}</Text>
            </TouchableOpacity>
            )
          }
        }}
        ListHeaderComponent={()=>{return(
          <TouchableOpacity onPress={()=>{this.setState({hide:!this.state.hide})}}>
            <View style={styles.heading}><Text style={styles.headingText}>Inbox</Text></View>
          </TouchableOpacity>
        
        
        )}}
      />
      <TouchableOpacity 
      onPress={()=>{
        this.setState({
          MailType:"OUT",
          SelectedMailType:this.state.data.Sent,
          title:"Sent"
          })
        this.Ref.closeDrawer();
        }
        }>
        <View style={styles.heading}>
        <Text 
      style={styles.headingText}
      >Sent</Text>

      </View></TouchableOpacity>

      <TouchableOpacity
      onPress={()=>{
        this.setState(
          {
            MailType:"OUT",
            SelectedMailType:this.state.data.Outbox,
            title:"Outbox"
          }
          )
        this.Ref.closeDrawer();
        }
        }
      ><View style={styles.heading}><Text style={styles.headingText}>Outbox</Text></View></TouchableOpacity>
      </View>
      
      
      
    )
    return (
      <DrawerLayoutAndroid
      ref={ref=>(this.Ref=ref)}
      drawerWidth={200}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => navigationView}>
      <View style={styles.container}>
      
        <View style={styles.header}>

            <Image style={styles.img} source={require('./orange.png')}/>
            <Text style={{fontSize:24,color:'white',textAlign:'center'}}>{this.state.title}</Text>
            <TouchableOpacity style={styles.Micon} 
            onPress={()=>{this.Ref.openDrawer()}}
            >
            <Image  source={require('./menu-circular-button.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filter} onPress={()=>{this.setState({SelectedMailType:this.state.SelectedMailType.reverse()})}}>
              <Image source={require('./filter-tool-black-shape.png')}/>
            </TouchableOpacity>
            
        </View>

        <View>
            <FlatList
              extraData={this.state}
              data={this.state.SelectedMailType}
              renderItem={({item})=>
              {
                if(this.state.MailType === "IN")
                {
                 return(<Mail
                       Username={item.From}
                       Subject={item.Subject}
                       date={item.date}
                 ></Mail>)
                //  <Text>{item.From}</Text>
                }
                else
                {
                  return(<Mail
                    Username={item.To}
                       Subject={item.Subject}
                       date={item.date}
                  ></Mail>)
                  // <Text>{item.To}</Text>
                }
              }
           }
            />
        </View>

      </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    height:70,
    width: wp('100%')
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img:{
    position:'absolute',
    height:70
  },
  Micon:{
    position:'absolute',
    top:20,
    left:10
  },
  listText:{
         textAlign:'center',
         fontSize:15
  },
  headingText:{
    fontWeight:'bold',
    fontSize:20
  },
   
    heading:{
      paddingHorizontal: 20,
      margin: 15,
    },
    drawerContainer:{
      paddingVertical: 30,
    },
    textContainer:{
      margin:10,
    },
    filter:{
      position:'absolute',
      top:20,
      right:10

    }

});
