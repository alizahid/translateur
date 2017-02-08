import React, {Component} from 'react'
import {KeyboardAvoidingView} from 'react-native'

import {theme} from '../helpers'

export default class MainView extends Component {
	render() {
		return (
			<KeyboardAvoidingView style={[styles.container, this.props.style]} behavior="padding">
				{this.props.children}
			</KeyboardAvoidingView>
		)
	}
}

const styles = {
	container: {
		backgroundColor: theme.primary,
		flex: 1
	}
}
