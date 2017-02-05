import React, {Component} from 'react'
import {
	ActivityIndicator,
	Clipboard,
	ListView,
	Text,
	TouchableHighlight,
	View
} from 'react-native'

import {MainView} from '../components'
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

	async componentDidMount() {
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

	_copy(text) {
		Clipboard.setString(text)
	}

	_language(code) {
		return data.languages.find(language => language.code === code)
	}

	_renderRow(data) {
		const language = this._language(data.language)

		return (
			<TouchableHighlight onPress={() => this._copy(data.text)}>
				<View style={styles.list.container}>
					<View style={styles.list.label.container}>
						<Text style={styles.list.label.text}>{language.name}</Text>
					</View>
					<Text style={styles.list.translation}>{data.text}</Text>
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
				{this._loading() || <ListView dataSource={this.state.dataSource} renderRow={data => this._renderRow(data)} renderSeparator={(section, row) => this._renderSeparator(row)} enableEmptySections={true}/>}
				{this._loading() && <ActivityIndicator style={styles.loading} color="white"/>}
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
		container: {
			padding: 10
		},
		label: {
			container: {
				alignSelf: 'flex-start',
				backgroundColor: '#1C1F2B',
				borderRadius: 5,
				padding: 5,
				marginBottom: 10
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
