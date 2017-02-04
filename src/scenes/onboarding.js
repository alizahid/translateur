import React, {Component} from 'react'
import {
	Image,
	ListView,
	Platform,
	ScrollView,
	Text,
	TouchableHighlight,
	View
} from 'react-native'

import {Button, Input, MainView} from '../components'
import {db, images} from '../helpers'

import data from '../data'

export default class Onboarding extends Component {
	constructor() {
		super()

		const languages = data.languages.map(language => ({
			...language,
			selected: false
		}))

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource: this.ds.cloneWithRows(languages),
			languages,
			query: '',
			selected: 0
		}
	}

	async _continue() {
		if (this.state.selected > 0) {
			let languages = this.state.languages.filter(language => language.selected).map(language => language.code)

			await db.put('onboarding', true)
			await db.put('languages', languages)

			this.props.navigator.push({name: 'main'})
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

		let selected = this.state.selected

		if (data.selected) {
			selected++
		} else {
			selected--
		}

		this.setState({dataSource: this.ds.cloneWithRows(languages), languages: this.state.languages, selected})
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
			<MainView style={styles.container}>
				<View style={styles.header.container}>
					<Text style={styles.header.title}>Select languages</Text>
					<Text style={styles.header.subtitle}>You can change these later</Text>
					<Input onChangeText={query => this._filter(query)} placeholder="Filter"/>
				</View>
				<ListView dataSource={this.state.dataSource} renderRow={(data, section, row) => this._renderRow(data, row)} renderSeparator={(section, row) => this._renderSeparator(row)} enableEmptySections={true}/>
				<View>
					{this.state.selected > 0 && <Button label="Continue" onPress={() => this._continue()}/>}
				</View>
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
