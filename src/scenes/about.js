import React, {Component} from 'react'
import {Image, Linking, ScrollView, Text, TouchableHighlight} from 'react-native'

import {MainView} from '../components'
import {images} from '../helpers'

export default class About extends Component {
	_website() {
		Linking.openURL('https://translateur.co/')
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<MainView>
					<Image style={styles.logo} source={images.Translateur}/>
					<Text style={styles.h1}>Translateur</Text>
					<Text style={styles.h2}>multiple translations instantly</Text>
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
		backgroundColor: '#2D3143',
		padding: 15
	},
	logo: {
		height: 51,
		width: 69
	},
	h1: {
		color: '#FFF',
		fontSize: 22,
		fontWeight: '500',
		marginTop: 20
	},
	h2: {
		color: '#FFF',
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 10,
		marginTop: 5
	},
	text: {
		color: '#FFF',
		lineHeight: 20,
		marginVertical: 10
	},
	button: {
		container: {
			alignItems: 'center',
			backgroundColor: '#1C1F2B',
			borderRadius: 5,
			marginVertical: 15,
			padding: 15
		},
		label: {
			color: '#FFF'
		}
	}
}
