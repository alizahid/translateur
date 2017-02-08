import React, {Component} from 'react'

import {Button, Languages, MainView, Textarea} from '../components'
import {db, images} from '../helpers'

export default class Main extends Component {
	state = {
		text: ''
	}

	constructor(props) {
		super(props)

		props.route.action = this._settings
		props.route.icon = images.settings
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

	_settings(route, navigator) {
		navigator.push({name: 'settings'})
	}

	render() {
		return (
			<MainView style={styles.container}>
				{this.state.languages && <Languages languages={this.state.languages}/>}
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
	input: {
		flex: 1
	}
}
