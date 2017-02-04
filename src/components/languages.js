import React, {Component} from 'react'
import {ListView, Text, View} from 'react-native'

import {db} from '../helpers'

import data from '../data'

export default class Languages extends Component {
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

		this.setState({dataSource: this.ds.cloneWithRows(languages), languages})
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
		return (
			<View style={[this.props.style]}>
				<ListView style={styles.container} dataSource={this.state.dataSource} renderRow={data => this._renderRow(data)} renderSeparator={(section, row) => this._renderSeparator(row)} horizontal={true} enableEmptySections={true}/>
			</View>
		)
	}
}

const styles = {
	container: {
		backgroundColor: '#1C1F2B',
		padding: 15
	},
	list: {
		container: {
			backgroundColor: '#2D3143',
			borderRadius: 10 / 2,
			padding: 10
		},
		label: {
			color: '#FFF',
			fontSize: 12
		},
		separator: {
			width: 10
		}
	}
}
