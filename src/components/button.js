import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import {theme} from '../helpers'

export default class Button extends Component {
	render() {
		return (
			<View style={[styles.container, this.props.style]}>
				<TouchableOpacity onPress={this.props.onPress}>
					<Text style={styles.label}>{this.props.label}</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = {
	container: {
		backgroundColor: theme.accent
	},
	label: {
		color: theme.color,
		margin: theme.margin,
		textAlign: 'center'
	}
}
