import React, {Component} from 'react'
import {Image, Linking, ScrollView, Text, TouchableHighlight} from 'react-native'

import {MainView} from '../components'
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
					<TouchableHighlight style={styles.button.container} onPress={() => this._website()}>
						<Text style={styles.button.label}>Check our website</Text>
					</TouchableHighlight>
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
		container: {
			alignItems: 'center',
			backgroundColor: theme.accent,
			borderRadius: theme.borderRadius,
			marginBottom: theme.margin,
			marginTop: theme.margin * 2,
			padding: theme.margin
		},
		label: {
			color: theme.color
		}
	}
}
