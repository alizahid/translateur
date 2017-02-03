import {AsyncStorage} from 'react-native'

export default {
	async get(key, defaultValue = null) {
		try {
			const value = await AsyncStorage.getItem(key)

			if (value !== null) {
				return JSON.parse(value)
			}

			return defaultValue
		} catch (error) {
			return defaultValue
		}
	},
	async put(key, value) {
		try {
			return await AsyncStorage.setItem(key, JSON.stringify(value))
		} catch (error) {}
	},
	async remove(key) {
		try {
			return await AsyncStorage.removeItem(key)
		} catch (error) {}
	}
}
