import React, {Component} from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View
} from 'react-native'

export default class Translateur extends Component {
	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<ScrollView style={styles.main}>
					<Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus orci, scelerisque quis diam nec, laoreet elementum turpis. Aenean lacus augue, facilisis vel ligula quis, tincidunt consequat massa. Vestibulum nec congue quam, cursus interdum neque. Proin sed consequat libero, at sollicitudin mauris. Fusce a ante lacus. Integer pharetra, leo fringilla maximus faucibus, dolor ligula lobortis est, sed cursus odio ante et sem. Nullam sed sem sed nibh pharetra dapibus. In ut mattis enim. Curabitur nec consectetur justo. Sed eu enim ut dui aliquam eleifend.</Text>
					<Text style={styles.paragraph}>Donec vel arcu eget arcu pellentesque ultrices. Integer vitae fringilla risus. Nunc lacus arcu, accumsan pharetra pharetra sit amet, condimentum ac magna. Maecenas efficitur auctor elementum. Quisque nec consequat odio, a volutpat justo. Nulla aliquet faucibus dolor, sed tempor ligula consectetur sit amet. Ut porttitor erat sapien, vitae blandit libero porta ut. Nunc ac tellus semper, dignissim ipsum et, sollicitudin nibh.</Text>
					<Text style={styles.paragraph}>Nullam vitae hendrerit enim, id sodales tellus. Aenean suscipit facilisis massa ut interdum. Aenean in viverra tellus. Praesent faucibus varius justo. Ut tincidunt mauris nec ultricies interdum. Maecenas dictum orci nec lectus dapibus sagittis. Etiam consectetur fringilla aliquam.</Text>
					<Text style={styles.paragraph}>Vestibulum at condimentum ex, venenatis consectetur massa. Donec eget ex vitae quam sodales euismod. Vestibulum gravida tellus tempor eros ornare, a accumsan leo varius. Proin fringilla quam neque, id eleifend elit ultricies nec. Vivamus ornare purus vitae tristique placerat. Vivamus lorem orci, vehicula non leo eget, interdum venenatis massa. Nunc luctus efficitur eleifend. Ut nec aliquet massa. Quisque a rhoncus risus. Morbi sapien turpis, fringilla eu diam quis, mollis imperdiet elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus quis risus lacinia, varius dolor vitae, maximus sem.</Text>
				</ScrollView>
				<View style={styles.footer}>
					<Text>Hello</Text>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 20 : 0
	},
	main: {
		flex: 1
	},
	paragraph: {
		margin: 10,
		lineHeight: 22
	},
	footer: {}
}
