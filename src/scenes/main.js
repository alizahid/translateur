import React, {Component} from 'react'
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View
} from 'react-native'

import {Button, Languages, MainView, Textarea} from '../components'
import {db, images} from '../helpers'

export default class Main extends Component {
	_translate() {
		console.log(123)
	}

	render() {
		return (
			<MainView style={styles.container}>
				<View style={styles.header.container}>
					<Image style={styles.header.logo} source={images.translateur}/>
				</View>
				<Languages/>
				<Textarea style={styles.input} placeholder="Type something…"/>
				<Button label="Translate" onPress={() => this._translate()}/>
			</MainView>
		)
	}
}

const styles = {
	container: {
		backgroundColor: '#2D3143'
	},
	header: {
		container: {
			backgroundColor: '#1C1F2B',
			paddingTop: Platform.OS === 'ios' ? 20 : 0
		},
		title: {
			color: '#FFF',
			fontSize: 32,
			margin: 10,
			fontWeight: '200'
		},
		logo: {
			height: 92 / 3,
			margin: 15,
			width: 121 / 3
		}
	},
	input: {
		flex: 1
	}
}
