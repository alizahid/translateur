import React, {Component} from 'react'
import {
	Image,
	Linking,
	ListView,
	Platform,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

import Share from 'react-native-share'

import {MainView} from '../components'
import {db, images, theme} from '../helpers'

import data from '../data'

export default class Settings extends Component {
	constructor() {
		super()

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})

		this.state = {
			dataSource: this.ds.cloneWithRows([
				{
					icon: images.about,
					label: 'About'
				}, {
					icon: images.rate,
					label: 'Rate'
				}, {
					icon: images.languages,
					label: 'Select languages'
				}, {
					icon: images.share,
					label: 'Share'
				}
			])
		}
	}

	_action(data) {
		let label = data.label.toLowerCase()

		switch (label) {
			case 'about':
				return this.props.navigator.push({name: 'about'})

			case 'rate':
				if (Platform.OS == 'ios') {
					return Linking.openURL('itms-apps://itunes.apple.com/us/app/translateur/id1202583921?mt=8')
				} else {
					return Linking.openURL('market://details?id=co.translateur')
				}

			case 'select languages':
				return this.props.navigator.push({name: 'languages'})

			case 'share':
				return Share.open({url: 'https://translateur.co/', message: 'Translateur - multiple translations instantly'})
		}
	}

	_renderRow(data) {
		return (
			<TouchableOpacity onPress={() => this._action(data)}>
				<View style={styles.list.container}>
					<Image style={styles.list.icon} source={data.icon}/>
					<Text style={styles.list.label}>{data.label}</Text>
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
				<ListView dataSource={this.state.dataSource} renderRow={data => this._renderRow(data)} renderSeparator={(section, row) => this._renderSeparator(row)} enableEmptySections={true}/>
			</MainView>
		)
	}
}

const styles = {
	list: {
		container: {
			alignItems: 'center',
			flexDirection: 'row',
			padding: theme.margin
		},
		icon: {
			height: 20,
			width: 20
		},
		label: {
			color: theme.color,
			marginLeft: theme.margin
		},
		separator: {
			backgroundColor: theme.border,
			height: 1
		}
	}
}
