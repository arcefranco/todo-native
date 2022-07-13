import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'

import Layout from '../components/Layout'
import TaskList from '../components/TaskList'

export default function HomeScreen() {

  return (
    <Layout>
        <TaskList/>
    </Layout>
  )
}