import React, {Component} from 'react'
import {TextInput, View} from 'react-native'

import {theme} from '../helpers'

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
		backgroundColor: theme.border
	},
	input: {
		color: theme.color,
		fontSize: 14,
		height: 50,
		padding: theme.margin
	},
	placeholder: {
		color: theme.placeholder
	}
}
