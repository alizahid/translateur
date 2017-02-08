import React, {Component} from 'react'
import {TextInput, View} from 'react-native'

import {theme} from '../helpers'

export default class Textarea extends Component {
	render() {
		return <TextInput style={styles.input} onChangeText={this.props.onChangeText} placeholder={this.props.placeholder} placeholderTextColor={styles.placeholder.color} multiline={true} underlineColorAndroid="transparent"/>
	}
}

const styles = {
	input: {
		color: theme.color,
		flex: 1,
		fontSize: 14,
		padding: theme.margin,
		textAlignVertical: 'top'
	},
	placeholder: {
		color: theme.placeholder
	}
}
