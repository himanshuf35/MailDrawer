import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,SectionList,TouchableOpacity,Image,FlatList} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class Mail extends Component
{
    constructor(props)
    {
        super(props)
        this.state={

        }
    }
    render()
    {
        return(
            <View style={styles.messageBox}>
               <Image style={styles.image} source={require('./man.png')}/>
               <View style={styles.box}>
                   <Text>{this.props.Username}</Text>
                   <Text>{this.props.Subject}</Text>
               </View>
               <View style={styles.dateBox}>
                   <Text>{this.props.date}</Text>
               </View>
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
        messageBox:{
            width: wp('98%'),
            height:70,
            marginVertical: 5,
            borderWidth: 1,
            padding:5
        },
        image:{
            position:'absolute',
            left:10,
            top:1
        },
        box:{
            position: 'absolute',
            left:80,
            width: wp('60%'),
            height:60,
            padding:5

        },
        dateBox:{
            position:'absolute',
            right:10
        }
    }
)