import React, {useState, useEffect} from 'react'
import { FlatList, RefreshControl} from 'react-native'
import TaskItem from './TaskItem'
import { useIsFocused } from '@react-navigation/native'

import { getTasks, deleteTask} from '../api'

const TaskList = () => {
    const isFocused = useIsFocused()
    
    const [tasks, setTasks] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const loadTasks = async () => {
        const data = await getTasks()
        setTasks(data)
    }


    useEffect(()=> {   
       loadTasks();
    },[isFocused])

    const handleDelete = async (id) => {
        await deleteTask(id)
        await loadTasks()
    }
   
    const renderItem = ({item}) => {
    return <TaskItem handleDelete={handleDelete} task={item}/>
    }

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true)
        await loadTasks();
        setRefreshing(false)
    })


    return (
    <FlatList 
    style={{width:'100%'}}
    data={tasks}
    keyExtractor={(item) => item.id}
    renderItem={renderItem}
    refreshControl = {
        <RefreshControl
        refreshing={refreshing}
        colors={['#78e08f']}
        tintColor={'#78e08f'}
        onRefresh={onRefresh}
        
        />
        
    }  
    />
  )
}

export default TaskList