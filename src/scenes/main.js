import React, {Component} from 'react'
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View
} from 'react-native'

import {Button, HeaderButton, Languages, MainView, Textarea} from '../components'
import {db, images} from '../helpers'

export default class Main extends Component {
	state = {
		languages: [],
		text: ''
	}

	async componentDidMount() {
		const languages = await db.get('languages')

		this.setState({languages})
	}

	componentWillReceiveProps() {
		this.componentDidMount()
	}

	_translate() {
		let text = this.state.text

		if (text.length > 0) {
			this.props.navigator.push({name: 'translations', text})
		}
	}

	_languageSelector() {
		this.props.navigator.push({
			index: this.props.route.index + 1,
			name: 'languages'
		})
	}

	render() {
		return (
			<MainView style={styles.container}>
				<View style={styles.header.container}>
					<Image style={styles.header.logo} source={images.translateur}/>
					<HeaderButton style={styles.header.button} source={images.menu} onPress={() => this._languageSelector()}/>
				</View>
				<Languages languages={this.state.languages}/>
				<Textarea style={styles.input} onChangeText={text => this.setState({text})} placeholder="Type something…"/>
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
			alignItems: 'flex-start',
			backgroundColor: '#1C1F2B',
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingTop: Platform.OS === 'ios' ? 20 : 0
		},
		logo: {
			height: 180 / 4,
			margin: 15,
			width: 237 / 4
		}
	},
	input: {
		flex: 1
	}
}
