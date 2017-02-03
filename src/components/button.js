import React, {Component} from 'react'
import {Text, TouchableHighlight} from 'react-native'

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
		backgroundColor: '#1C1F2B',
		padding: 15,
		alignItems: 'center'
	},
	label: {
		color: '#FFF'
	}
}
