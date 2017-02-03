import React, {Component} from 'react'
import {Image, TouchableHighlight} from 'react-native'

export default class HeaderButton extends Component {
	render() {
		return (
			<TouchableHighlight style={[styles.container, this.props.style]} underlayColor="#FFF" onPress={this.props.onPress}>
				<Image style={styles.image} source={this.props.source}/>
			</TouchableHighlight>
		)
	}
}

const styles = {
	container: {
		padding: 10
	},
	image: {
		height: 20,
		width: 20
	}
}
