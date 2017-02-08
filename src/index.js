import React, {Component} from 'react'
import {
	BackAndroid,
	Image,
	Navigator,
	Platform,
	StatusBar,
	TouchableOpacity,
	View
} from 'react-native'

import codePush from 'react-native-code-push'

import {About, Main, Languages, Settings, Translations} from './scenes'

import {db, images, theme} from './helpers'

class Translateur extends Component {
	state = {
		route: {}
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

			case 'settings':
				return <Settings route={route} navigator={navigator}/>

			case 'about':
				return <About route={route} navigator={navigator}/>

			case 'languages':
				return <Languages route={route} navigator={navigator}/>

			case 'translations':
				return <Translations route={route} navigator={navigator}/>
		}
	}

	_navigationBar() {
		return <Navigator.NavigationBar style={styles.nav.bar} routeMapper={this._routerMapper()}/>
	}

	_routerMapper() {
		return {
			LeftButton(route, navigator, index) {
				if (index === 0) {
					return
				}

				return (
					<TouchableOpacity style={styles.nav.button.container} onPress={() => navigator.pop()}>
						<Image style={styles.nav.button.icon} source={images.left}/>
					</TouchableOpacity>
				)
			},
			RightButton(route, navigator, index) {
				return (
					<TouchableOpacity style={styles.nav.button.container} onPress={() => route.action(route, navigator, index)}>
						<Image style={styles.nav.button.icon} source={route.icon}/>
					</TouchableOpacity>
				)
			},
			Title() {
				return null
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={theme.accent} barStyle="light-content"/>
				<Navigator sceneStyle={styles.scene} ref={ref => this._navigator = ref} initialRoute={this.state.route} renderScene={this._renderScene} navigationBar={this._navigationBar()}/>
			</View>
		)
	}
}

export default codePush(Translateur)

const styles = {
	container: {
		flex: 1
	},
	nav: {
		bar: {
			backgroundColor: theme.accent
		},
		button: {
			container: {
				padding: Navigator.NavigationBar.Styles.General.NavBarHeight / 4
			},
			icon: {
				height: Navigator.NavigationBar.Styles.General.NavBarHeight / 2,
				width: Navigator.NavigationBar.Styles.General.NavBarHeight / 2
			}
		}
	},
	scene: {
		overflow: 'visible',
		paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
		shadowColor: 'black',
		shadowOffset: {
			height: 0,
			width: 0
		},
		shadowOpacity: 0.5,
		shadowRadius: 5
	}
}
