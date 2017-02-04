import React, {Component} from 'react'
import {BackAndroid, Navigator, StatusBar, View} from 'react-native'

import {Main, Languages, Translations} from './scenes'

import {db} from './helpers'

export default class Translateur extends Component {
	state = {
		route: {
			index: 0
		}
	}

	constructor() {
		super()

		BackAndroid.addEventListener('hardwareBackPress', () => {
			if (this._navigator.getCurrentRoutes().length > 1) {
				this._navigator.pop()

				return true
			} else {
				return false
			}
		})
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
		switch (route.name) {
			case 'main':
				return <Main route={route} navigator={navigator}/>

			case 'languages':
				return <Languages route={route} navigator={navigator}/>

			case 'translations':
				return <Translations route={route} navigator={navigator}/>
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#1C1F2B" barStyle="light-content"/>
				<Navigator ref={ref => this._navigator = ref} initialRoute={this.state.route} renderScene={this._renderScene}/>
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1
	}
}
