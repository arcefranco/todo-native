import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { deleteTask} from '../api'
import { useNavigation } from '@react-navigation/native'

const TaskItem = ({task, handleDelete}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.itemContainer}>

        <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen', {id: task.id})}>
            <Text style={styles.itemTitle}>Title: {task.title}</Text>
            <Text style={styles.itemTitle}>Description: {task.description}</Text>
        </TouchableOpacity>


      <TouchableOpacity style={{
        backgroundColor:'#ee5253', 
        padding:4,
        borderRadius:5
        }}
        onPress={() => handleDelete(task.id)}
        
        >
            <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'black',
        padding:20,
        marginVertical:8,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    itemTitle: {
        color:'white',
        margin:3
    }

})
export default TaskItem