import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Search from './pages/Search';
import Weather from './pages/Weather';
import CitySearch from './pages/CitySearch';

export default function Routes () {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Weather" component={Weather} />
            <Stack.Screen name="CitySearch" component={CitySearch} />
        </Stack.Navigator>
    )
}