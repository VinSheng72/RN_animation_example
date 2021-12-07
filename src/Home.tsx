import { useNavigation } from '@react-navigation/core'
import React, { FC } from 'react'
import { View, Text, FlatList, TouchableOpacity, ListRenderItem } from 'react-native'
import { screen } from '../App'

interface itemComponent {
    component: FC
    title: string
};




const Home = () => {
    const navigation = useNavigation();

    const renderItem: ListRenderItem<itemComponent> = (data) => {
        if (data.index === 0) return null
        return (
            <TouchableOpacity onPress={() => navigation.navigate(data.item.title)} style={{ height: 50, borderBottomWidth: 1, flex: 1, justifyContent: "center", paddingHorizontal: 20 }} >
                <Text style={{ fontSize: 25 }} >{data.item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }} >
            <FlatList
                data={screen}
                renderItem={renderItem}
            />
        </View>
    )
}

export default Home
Text