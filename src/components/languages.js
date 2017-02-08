import React, {Component} from 'react'
import {ListView, Text, View} from 'react-native'

import {theme} from '../helpers'

import data from '../data'

export default class Languages extends Component {
	constructor(props) {
		super(props)

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource: this.ds.cloneWithRows(props.languages),
			languages: props.languages
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			dataSource: this.ds.cloneWithRows(props.languages),
			languages: props.languages
		})
	}

	_getName(code) {
		return data.languages.find(language => language.code === code).name
	}

	_renderRow(data) {
		return (
			<View style={styles.list.container}>
				<Text style={styles.list.label}>{this._getName(data)}</Text>
			</View>
		)
	}

	_renderSeparator(row) {
		return <View key={row} style={styles.list.separator}/>
	}

	render() {
		if (!this.state.dataSource) {
			return null
		}

		return (
			<View style={[this.props.style]}>
				<ListView style={styles.container} dataSource={this.state.dataSource} renderRow={data => this._renderRow(data)} renderSeparator={(section, row) => this._renderSeparator(row)} horizontal={true} enableEmptySections={true}/>
			</View>
		)
	}
}

const styles = {
	container: {
		backgroundColor: theme.accent,
		padding: theme.margin
	},
	list: {
		container: {
			backgroundColor: theme.primary,
			borderRadius: theme.borderRadius,
			padding: theme.padding
		},
		label: {
			color: theme.color,
			fontSize: 12
		},
		separator: {
			width: 10
		}
	}
}
