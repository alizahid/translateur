import {GOOGLE_TRANSLATE_API_KEY} from 'react-native-dotenv'

export function request(url, language) {
	return new Promise((resolve, reject) => {
		fetch(url).then(response => response.json()).then(json => {
			let translation = json.data.translations.pop()

			resolve({language, source: translation.detectedSourceLanguage, text: translation.translatedText})
		}).catch(reject)
	})
}

export default function translate(text, languages) {
	return new Promise((resolve, reject) => {
		let requests = languages.map(language => request(`https://www.googleapis.com/language/translate/v2?q=${encodeURIComponent(text)}&target=${language}&key=${GOOGLE_TRANSLATE_API_KEY}`, language))

		Promise.all(requests).then(data => {
			let source = data[0].source

			let index = languages.indexOf(source)

			if (index < 0) {
				data.unshift({language: source, text})
			} else if (index > 0) {
				let main = data.splice(index, 1).pop()

				data.unshift(main)
			}

			resolve(data)
		}).catch(reject)
	})
}
