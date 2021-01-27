import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import axios from 'axios';

import WeatherInformation from '../Weather/index';
import { MaterialIcons } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';

import { 
    View, 
    Text, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView,
    ActivityIndicator,
} from 'react-native';

const WeatherStack = createStackNavigator();

import { AntDesign } from '@expo/vector-icons';

const WEATHER_API_KEY = '46e586f611564e4ff8750dd7089dd4cd';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

// import { Container } from './styles';

const Search = ({ navigation }) => {
    const [value, setValue] = React.useState('')
    const [unitsSystem, setUnitsSystem] = React.useState('metric')

    const [currentLocation, setCurrentLocation] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();
    const cityInformation = useSelector(state => state.data_search)

    async function handleUseCurrentLocation() {
        setLoading(true)
        try {
            const location = await Location.getCurrentPositionAsync()
            const { latitude, longitude } = location.coords

            const currentLocationWeatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`
            const currentLocationResponse = await fetch(currentLocationWeatherUrl)
            const currentLocationData = await currentLocationResponse.json()

            const data = {
                id: currentLocationData.id,
                name: currentLocationData.name,
                temp: currentLocationData.main.temp
            }

            if (currentLocationResponse.ok) {
                setLoading(false)
            }

            if (currentLocation.length > 0) {
                return alert ('Current location is already added !')
            }

            if (currentLocation.length === 0 ) {

                const idsAdded = cityInformation.map(item => item.id === data.id)

                function check (id) { return id === true }

                const alreadyExist = idsAdded.some(check)

                if (alreadyExist === true) {
                    return alert ('City is already added !')
                }

                if (alreadyExist === false) {
                    setCurrentLocation(oldList => [
                        ...oldList, data
                    ])

                    dispatch({ 
                        type: 'ADD_CURRENT_LOCATION', 
                        payload: currentLocationData
                    })
                } 

            } 

            /* console.log('data: ', currentLocationData) */

        } catch (err) {
            setLoading(false)
            console.log(err, 'Erro na requisição')
        }
    }

    async function handleRequestCoordinates() {
        try {
            const weatherUrl1 = `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${value}`
            const response = await fetch(weatherUrl1)
            const result = await response.json()

            const data = {
                latitude:  result.results[0].geometry.lat,
                longitude: result.results[0].geometry.lng,
                city: result.results[0].components.city
            }
            
            dispatch({ 
                type: 'ADD_COORDINATES_CITY_INFORMATION', 
                payload: data
            })

            setTimeout( async () => {
                /* console.log('City Information redux: ', cityInformation[0].latitude)  */
            }, 1000) 
        } catch (err) {

        }
    }

    async function handleRequestSearchLocation() {
        
        setLoading(true)
        try {
            await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${WEATHER_API_KEY}`).then(response => {
                const data = response.data

                if (cityInformation.length === 0) {
                    dispatch({
                        type: 'ADD_SEARCH_CITY_INFORMATION',
                        payload: data
                    })
                }

                /* console.log('CURRENT LOCATION DATA ID: ', currentLocation[0].id)

                const hasCurrentLocation = currentLocation[0].id

                if (hasCurrentLocation === data.id) {
                    return alert ('City is already added ! Is your current location !')
                } */

                if (cityInformation.length > 0) {

                    const idsAdded = cityInformation.map(item => item.id === data.id)

                    function check (id) { return id === true }

                    const alreadyExist = idsAdded.some(check)

                    if(alreadyExist === false) {
                        return dispatch({
                            type: 'ADD_SEARCH_CITY_INFORMATION',
                            payload: data
                        })
                    } 

                    if (alreadyExist === true) {
                        return alert ('City is already added !')
                    }
                }
            })

            setValue('')

            setLoading(false)
            
        } catch (err) {
            setLoading(false)
            alert(/* err, */ 'City ​​not found, try again :/')
        }
    }

    function navigateToWeatherDetais() {
        navigation.navigate('Weather')
    }

    function onPressCity(id) {
        console.log('id city selected: ', id)
        navigation.navigate('CitySearch', {
            id,
        })
    }

    return (
        <ScrollView style={styles.scrollView} >
            <>
                { loading && 
                    <View style={styles.loading} >
                        <ActivityIndicator size="large" color="red" /> 
                    </View>
                }

                {
                    !loading && 
                    <View style={{ margin: 10 }} >

                        <Text style={{ marginBottom: 10, fontSize: 18 }} >Type your location here: </Text>
                        <TextInput 
                            style={{ height: 60, backgroundColor: '#ddd', borderRadius: 10, padding: 10}} 
                            value={value}
                            onChangeText={(e) => setValue(e)}
                            placeholder="Please input the location" 
                        />

                        <View style={styles.boxButtons} >
                            <TouchableOpacity onPress={handleRequestSearchLocation} style={styles.buttonSearch} >
                                <Text style={{ color: '#fff' }} >Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleUseCurrentLocation} style={styles.buttonCurrentLocation} >
                                <MaterialIcons name="gps-fixed" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.boxRecentsSearchs} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Recent Searchs</Text>
                        
                            {
                                currentLocation.map((item) => (
                                    <TouchableOpacity onPress={navigateToWeatherDetais} key={item.id} style={ styles.boxCity } >
                                        <Text style={{ color: '#000' }} >{item.name}</Text>
                                        <View style={ styles.boxTempIcon } >
                                            <Text style={{ color: '#000' }} >{(+item.temp).toFixed(1)}º</Text>
                                            <AntDesign name="right" size={20} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                            {
                                cityInformation.map((item) => (
                                    <TouchableOpacity onPress={() => onPressCity(item.id)} key={item.id} style={ styles.boxCity } >
                                        <Text style={{ color: '#000' }} >{item.name}</Text>
                                        <View style={ styles.boxTempIcon } >
                                            <Text style={{ color: '#000' }} >{(item.main.temp - 273.15).toFixed(1)}º</Text>
                                            <AntDesign name="right" size={20} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    </View>
                }
            </>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    boxButtons: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 15,
    },
    buttonCurrentLocation: {
        height: 50, 
        width: 120,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSearch: {
        height: 50, 
        width: 120,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxRecentsSearchs: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
        /* backgroundColor: '#ddd' */
    },
    boxCity: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        width: '100%',
        marginTop: 10,
        paddingLeft: 40,
        paddingRight: 10,
        backgroundColor: '#ddd',
        borderRadius: 10
    },
    boxTempIcon: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '30%',
    },
    loading: {
        flex: 1,
        marginTop: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Search;