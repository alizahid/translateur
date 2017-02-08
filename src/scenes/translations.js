import React, {Component} from 'react'
import {
	ActivityIndicator,
	Alert,
	Clipboard,
	ListView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

import {MainView} from '../components'
import {db, images, theme, translate} from '../helpers'

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

		try {
			let translations = await translate(this.props.route.text, languages)

			this.setState({dataSource: this.ds.cloneWithRows(translations), languages})
		} catch (error) {
			Alert.alert(null, error.message, [
				{
					text: 'OK',
					onPress: () => this.props.navigator.pop()
				}
			], {cancelable: false})
		}
	}

	_loading() {
		return this.state.dataSource.getRowCount() === 0 && !this.state.error
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
			<TouchableOpacity onPress={() => this._copy(data.text)}>
				<View style={styles.list.container}>
					<View style={styles.list.label.container}>
						<Text style={styles.list.label.text}>{language.name}</Text>
					</View>
					<Text style={styles.list.translation}>{data.text}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	_renderSeparator(row) {
		return <View key={row} style={styles.list.separator}/>
	}

	render() {
		return (
			<MainView>
				<Text style={styles.label}>Tap to copy translation</Text>
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
	label: {
		...theme.paragraph,
		backgroundColor: theme.accent,
		padding: theme.margin,
		textAlign: 'center'
	},
	list: {
		container: {
			padding: theme.margin
		},
		label: {
			container: {
				marginBottom: theme.margin
			},
			text: {
				color: theme.placeholder,
				fontSize: 12
			}
		},
		translation: {
			...theme.paragraph,
			flex: 1
		},
		separator: {
			backgroundColor: theme.border,
			height: 1
		}
	}
}
