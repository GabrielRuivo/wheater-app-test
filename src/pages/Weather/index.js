import React from 'react';
import { colors } from '../../utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image } from 'react-native';

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
// import { Container } from './styles';

const Weather = () => {

    const cityInformation = useSelector(state => state.data_current_location);

    const data = {
        feels_like: cityInformation[0].main.feels_like,
        humidity: cityInformation[0].main.humidity,
        pressure: cityInformation[0].main.pressure,
        temp: cityInformation[0].main.temp,
        speed: cityInformation[0].wind.speed,
        name: cityInformation[0].name,
        description: cityInformation[0].weather[0].description,
        icon: cityInformation[0].weather[0].icon,
        main: cityInformation[0].weather[0].main,
    }

    console.log('icon: ', cityInformation[0].weather[0].icon)

    const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`

    return (
        <View style={styles.container}>
            <View style={styles.weatherInfo} >
                <Text style={styles.nameCity} >{data.name}</Text>
                <Image style={styles.weatherIcon} source={{ uri: iconUrl }}/>
                <Text style={styles.textPrimary} >{(+data.temp).toFixed(1)}º</Text>
                <Text style={styles.weatherDescription} >{data.description}</Text>
                <Text style={styles.textSecondary} >{data.main}</Text>
            </View>

            <View style={styles.WeatherDetails} >
                <View style={styles.weatherDetailsRow} >
                    <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}} >
                        <View style={styles.weatherDetailsRow} >
                            <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems} >
                                <Text>Feels like:</Text>
                                <Text style={styles.textSecondary} >{data.feels_like}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsBox} >
                    <View style={styles.weatherDetailsRow} >
                            <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems} >
                                <Text>Humidity:</Text>
                                <Text style={styles.textSecondary} >{data.humidity}%</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{...styles.weatherDetailsRow, borderTopWidth: 1, borderTopColor: BORDER_COLOR}} >
                    <View style={{...styles.weatherDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR}} >
                        <View style={styles.weatherDetailsRow} >
                            <MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems} >
                                <Text>Wind Speed :</Text>
                                <Text style={styles.textSecondary} >{data.speed}km/h</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.weatherDetailsBox} >
                        <View style={styles.weatherDetailsRow} >
                            <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems} >
                                <Text>Pressure :</Text>
                                <Text style={styles.textSecondary} >{data.pressure} hPa</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    nameCity: {
        fontSize: 30,
    },  
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7
    },
    weatherInfo: {
        alignItems: 'center',
        marginBottom: 30,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weatherDescription: {
        textTransform: 'capitalize',
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10
    }
})

export default Weather;