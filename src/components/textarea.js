import React, {Component} from 'react'
import {TextInput, View} from 'react-native'

export default class Textarea extends Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<TextInput style={styles.input} onChangeText={this.props.onChangeText} placeholder={this.props.placeholder} placeholderTextColor={styles.placeholder.color} multiline={true} underlineColorAndroid="transparent"/>
			</View>
		)
	}
}

const styles = {
	container: {},
	input: {
		color: '#EEE',
		flex: 1,
		fontSize: 14,
		padding: 15,
		textAlignVertical: 'top'
	},
	placeholder: {
		color: 'rgba(255, 255, 255, 0.5)'
	}
}
