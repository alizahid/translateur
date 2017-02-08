import React, {Component} from 'react'
import {Text, TouchableHighlight} from 'react-native'

import {theme} from '../helpers'

export default class Button extends Component {
	render() {
		return (
			<TouchableHighlight style={styles.container} onPress={this.props.onPress}>
				<Text style={styles.label}>{this.props.label}</Text>
			</TouchableHighlight>
		)
	}
}

const styles = {
	container: {
		alignItems: 'center',
		backgroundColor: theme.accent,
		padding: theme.margin
	},
	label: {
		color: theme.color
	}
}
