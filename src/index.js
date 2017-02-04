import React, {Component} from 'react'
import {Navigator, StatusBar, View} from 'react-native'

import {Main, Languages, Translations} from './scenes'

import {db} from './helpers'

export default class Translateur extends Component {
	state = {
		route: {
			index: 0
		}
	}

	async componentDidMount() {
		let onboarding = await db.get('onboarding', false)

		if (onboarding) {
			this.state.route.name = 'main'
		} else {
			this.state.route.name = 'languages'
		}

		this.setState({route: this.state.route})
	}

	_renderScene(route, navigator) {
		if (route.name === 'main') {
			return <Main route={route} navigator={navigator}/>
		} else if (route.name === 'languages') {
			return <Languages route={route} navigator={navigator}/>
		} else if (route.name === 'translations') {
			return <Translations route={route} navigator={navigator}/>
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#1C1F2B" barStyle="light-content"/>
				<Navigator initialRoute={this.state.route} renderScene={this._renderScene}/>
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1
	}
}
