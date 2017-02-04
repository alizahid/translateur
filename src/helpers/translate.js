import {GOOGLE_TRANSLATE_API_KEY} from 'react-native-dotenv'

export function request(url, language) {
	return new Promise((resolve, reject) => {
		fetch(url).then(response => response.json()).then(json => resolve({language: language, text: json.data.translations.pop().translatedText})).catch(reject)
	})
}

export default function translate(text, languages) {
	return new Promise((resolve, reject) => {
		let requests = languages.map(language => request(`https://www.googleapis.com/language/translate/v2?q=${encodeURIComponent(text)}&target=${language}&key=${GOOGLE_TRANSLATE_API_KEY}&fields=${encodeURIComponent('translations/translatedText')}`, language))

		Promise.all(requests).then(resolve).catch(reject)
	})
}
