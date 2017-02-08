import React, {Component} from 'react'
import {Image, ListView, Text, TouchableHighlight, View} from 'react-native'

import {Input, MainView} from '../components'
import {db, images} from '../helpers'

import data from '../data'

export default class Onboarding extends Component {
	constructor(props) {
		super(props)

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource: this.ds.cloneWithRows(data.languages),
			languages: data.languages,
			onboarding: props.navigator.getCurrentRoutes().length === 1,
			query: '',
			selected: []
		}

		props.route.action = this._continue.bind(this)
		props.route.icon = images.check
	}

	async componentDidMount() {
		if (!this.state.onboarding) {
			const selected = await db.get('languages', [])

			let languages = this.state.languages.map(language => ({
				...language,
				selected: selected.indexOf(language.code) >= 0
			}))

			this.setState({dataSource: this.ds.cloneWithRows(languages), languages, selected})
		}
	}

	async _continue(route, navigator, index) {
		if (this.state.selected.length > 0) {
			if (this.state.onboarding) {
				await db.put('onboarding', true)
				await db.put('languages', this.state.selected)

				navigator.replace({name: 'main'})
			} else {
				await db.put('languages', this.state.selected)

				navigator.pop()
			}
		}
	}

	_filter(query, pass = false) {
		let filtered = this.state.languages.filter(language => language.name.toLowerCase().indexOf(query.toLowerCase()) >= 0)

		if (pass) {
			this.setState({query})

			return filtered
		}

		this.setState({query, dataSource: this.ds.cloneWithRows(filtered)})
	}

	_toggle(data, index) {
		let languages

		if (this.state.query.length > 0) {
			languages = this._filter(this.state.query, true)
		} else {
			languages = this.state.languages
		}

		data.selected = !data.selected

		let selected = this._select(data)

		this.setState({dataSource: this.ds.cloneWithRows(languages), languages: this.state.languages, selected})
	}

	_select(data) {
		const selected = this.state.selected

		let index = selected.indexOf(data.code)

		if (index >= 0) {
			selected.splice(index, 1)
		} else {
			selected.push(data.code)
		}

		return selected.sort()
	}

	_renderRow(data, index) {
		const style = [styles.list.image]

		if (data.selected) {
			style.push(styles.list.selected)
		}

		return (
			<TouchableHighlight onPress={() => this._toggle(data, index)}>
				<View style={styles.list.container}>
					<Text style={styles.list.label}>{data.name}</Text>
					<Image style={style} source={images.check}/>
				</View>
			</TouchableHighlight>
		)
	}

	_renderSeparator(row) {
		return <View key={row} style={styles.list.separator}/>
	}

	render() {
		return (
			<MainView>
				<View style={styles.header.container}>
					<Text style={styles.header.title}>Select languages</Text>
					{this.state.onboarding && <Text style={styles.header.subtitle}>You can change these later</Text>}
					<Input onChangeText={query => this._filter(query)} placeholder="Filter"/>
				</View>
				<ListView dataSource={this.state.dataSource} renderRow={(data, section, row) => this._renderRow(data, row)} renderSeparator={(section, row) => this._renderSeparator(row)} enableEmptySections={true}/>
			</MainView>
		)
	}
}

const styles = {
	header: {
		container: {
			backgroundColor: '#1C1F2B'
		},
		title: {
			color: 'white',
			fontSize: 24,
			fontWeight: '300',
			margin: 15
		},
		subtitle: {
			color: '#999',
			margin: 15,
			marginTop: 0
		}
	},
	list: {
		container: {
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingHorizontal: 15,
			paddingVertical: 10
		},
		label: {
			color: '#FFF'
		},
		image: {
			height: 20,
			opacity: 0.25,
			width: 20
		},
		selected: {
			opacity: 1
		},
		separator: {
			backgroundColor: 'rgba(0, 0, 0, 0.125)',
			height: 1
		}
	}
}
