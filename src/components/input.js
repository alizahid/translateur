import React, {Component} from 'react'
import {TextInput, View} from 'react-native'

export default class Input extends Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<TextInput style={styles.input} onChangeText={this.props.onChangeText} placeholder={this.props.placeholder} placeholderTextColor={styles.placeholder.color} clearButtonMode="always" underlineColorAndroid="transparent"/>
			</View>
		)
	}
}

const styles = {
	container: {
		backgroundColor: 'rgba(0, 0, 0, 0.125)'
	},
	input: {
		color: '#FFF',
		fontSize: 14,
		height: 50,
		padding: 15
	},
	placeholder: {
		color: '#666'
	}
}
