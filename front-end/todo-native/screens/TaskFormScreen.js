import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Platform } from 'react-native'
import Layout from '../components/Layout'
import * as Notification from 'expo-notifications'
import React, {useState, useEffect, useRef} from 'react'
import  DateTimePicker  from '@react-native-community/datetimepicker'
import { getTask, saveTask, updateTask } from '../api'


Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true
  })
});


export default function TaskFormScreen({navigation, route}) {

const [time, setTime] = useState(new Date(Date.now()))
const [editing, setEditing] = useState(false)




const onClick = async () => {

await Notification.scheduleNotificationAsync({
    content: {
      title: task.title,
      body: task.description,
      data: {data: "data goes here"}
    },
    trigger: {
      hour: time.getHours(),
      minute: time.getMinutes()
      
    }
  })
}

const [task, setTask] = useState({
        title: '',
        description: ''
    })



const handleChange = (name, value) => {
        setTask({
            ...task,
            [name]: value
        })
}

const handleSubmit =  () => {
    
      Promise.all([
        onClick(),
        saveTask(task),
        navigation.navigate('HomeScreen')
      ])
      
}


const handleUpdateSubmit = () => {
        updateTask(route.params.id,task)
        navigation.navigate('HomeScreen')
}

useEffect(() => {
      
  
if(route.params && route.params.id){
    navigation.setOptions({headerTitle: 'Updating a task'});
    setEditing(true);
    (async () =>{
        const task = await getTask(route.params.id)
        setTask({title: task.title, description: task.description})
    })();
        
      }
    

}, [])

    

  
    
  return (
    <Layout>
      <TextInput
      style={styles.input}
      placeholder='Title'
      placeholderTextColor={'#fff'}
      onChangeText={(text) => handleChange('title', text)}
      value={task.title}
      />
      <TextInput
      style={styles.input}
      placeholder='Description' 
      placeholderTextColor={'#fff'}
      onChangeText={(text) => handleChange('description', text)}
      value={task.description}
      />  
      <DateTimePicker
      value={time}
      mode={'time'}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      is24Hour={true}
      style={styles.timeSetter}
      on
       onChange={(event, date) => setTime(date)}   

      />


      <TouchableOpacity style={styles.buttonSave} onPress={editing ? handleUpdateSubmit : handleSubmit}>
            <Text style={styles.buttonText}>{editing ? 'Update task' : 'Save Task'}</Text>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        marginBottom: 7,
        borderColor: '#10ac84',
        height:45,
        borderWidth: 1,
        fontSize: 18,
        padding:10,
        margin:10,
        textAlign:'center',
        color:'#fff'
    },
    buttonSave: {
        padding:10,
        borderRadius: 5,
        marginBottom:3,
        marginTop: 10,
        backgroundColor: '#10ac84',
        width: '80%'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    },
    timeSetter: {
      width:200, 
      margin:25,
      backgroundColor:'#10ac84'
    }

})