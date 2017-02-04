import React, {Component} from 'react'
import {ActivityIndicator, ListView, Platform, Text, View} from 'react-native'

import {HeaderButton, MainView} from '../components'
import {db, images, translate} from '../helpers'

import data from '../data'

export default class Translations extends Component {
	constructor() {
		super()

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource: this.ds
		}
	}

	async componentWillMount() {
		const languages = await db.get('languages')

		let translations = await translate(this.props.route.text, languages)

		this.setState({dataSource: this.ds.cloneWithRows(translations), languages})
	}

	_back() {
		this.props.navigator.pop()
	}

	_loading() {
		return this.state.dataSource.getRowCount() === 0
	}

	_renderRow(data) {
		return (
			<View style={styles.list.container}>
				<View style={styles.list.label.container}>
					<Text style={styles.list.label.text}>{data.language.toUpperCase()}</Text>
				</View>
				<Text style={styles.list.translation}>{data.text}</Text>
			</View>
		)
	}

	_renderSeparator(row) {
		return <View key={row} style={styles.list.separator}/>
	}

	render() {
		return (
			<MainView style={styles.container}>
				<View style={styles.header.container}>
					<HeaderButton source={images.left} onPress={() => this._back()}/>
				</View>
				{this._loading() || <ListView style={styles.list.view} dataSource={this.state.dataSource} renderRow={data => this._renderRow(data)} renderSeparator={(section, row) => this._renderSeparator(row)} enableEmptySections={true}/>}
				{this._loading() && <ActivityIndicator style={styles.loading}/>}
			</MainView>
		)
	}
}

const styles = {
	loading: {
		flex: 1
	},
	container: {
		backgroundColor: '#2D3143'
	},
	header: {
		container: {
			alignItems: 'flex-start',
			backgroundColor: '#1C1F2B',
			paddingTop: Platform.OS === 'ios' ? 20 : 0
		}
	},
	text: {
		container: {
			backgroundColor: '#1C1F2B',
			padding: 10,
			paddingTop: 0
		},
		label: {
			color: '#FFF',
			lineHeight: 22,
			textAlign: 'center'
		}
	},
	list: {
		view: {},
		container: {
			alignItems: 'center',
			borderRadius: 10 / 2,
			flexDirection: 'row',
			padding: 10
		},
		label: {
			container: {
				backgroundColor: '#1C1F2B',
				borderRadius: 100,
				padding: 10,
				marginRight: 10
			},
			text: {
				color: '#FFF',
				fontSize: 12
			}
		},
		translation: {
			color: '#FFF',
			flex: 1,
			lineHeight: 22
		},
		separator: {
			backgroundColor: 'rgba(0, 0, 0, 0.125)',
			height: 1
		}
	}
}
