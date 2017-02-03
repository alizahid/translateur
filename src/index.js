import React, {Component} from 'react'
import {Navigator, StatusBar, View} from 'react-native'

import {Main, Onboarding} from './scenes'

import {db} from './helpers'

export default class Translateur extends Component {
	state = {
		route: {}
	}

	async componentDidMount() {
		let onboarding = await db.get('onboarding', false)

		if (onboarding) {
			this.state.route.name = 'main'
		} else {
			this.state.route.name = 'onboarding'
		}

		this.setState({route: this.state.route})
	}

	_renderScene(route, navigator) {
		console.log(route)

		if (route.name === 'main') {
			return <Main navigator={navigator}/>
		} else if (route.name === 'onboarding') {
			return <Onboarding navigator={navigator}/>
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
