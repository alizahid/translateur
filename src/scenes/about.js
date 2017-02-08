import React, {Component} from 'react'
import {Image, Linking, ScrollView, Text} from 'react-native'

import {Button, MainView} from '../components'
import {images, theme} from '../helpers'

export default class About extends Component {
	_website() {
		Linking.openURL('https://translateur.co/')
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<MainView>
					<Image style={styles.logo} source={images.Translateur}/>
					<Text style={styles.h2}>Translateur</Text>
					<Text style={styles.h3}>multiple translations instantly</Text>
					<Text style={styles.text}>Use Translateur to translate your text into more than 60 languages with one tap</Text>
					<Button style={styles.button} label="Check our website" onPress={() => this._website()}/>
				</MainView>
			</ScrollView>
		)
	}
}

const styles = {
	container: {
		backgroundColor: theme.primary,
		padding: theme.margin
	},
	logo: {
		height: 51,
		width: 69
	},
	h2: {
		...theme.h2,
		marginTop: theme.margin
	},
	h3: {
		...theme.h3,
		marginBottom: theme.margin,
		marginTop: theme.margin / 2
	},
	text: theme.paragraph,
	button: {
		borderRadius: theme.borderRadius,
		marginBottom: theme.margin,
		marginTop: theme.margin * 2
	}
}
