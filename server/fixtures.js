if (Languages.find().count() === 0) {
  const languages = ['Afrikaans', 'Ainu', 'Albanian', 'Arabic', 'Armenian', 'Azerbaijanian',
    'Basque', 'Bengali', 'Bihari', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Cantonese',
    'Catalan', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian',
    'Faroese', 'Finnish', 'Flemish', 'French', 'Gaelic', 'Georgian', 'German', 'Greek',
    'Haitian', 'Hawaiian', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Irish',
    'Italian', 'Japanese', 'Javanese', 'Kannada', 'Khmer', 'Kirghiz', 'Korean', 'Kurdish',
    'Laotian', 'Latin', 'Latvian', 'Lithuanian', 'Lojban', 'Macedonian', 'Malay', 'Maltese',
    'Mandarin', 'Marathi', 'Mongolian', 'Myanmar', 'Navajo', 'Norwegian', 'Ossetic', 'Panjabi',
    'Pashto', 'Persian', 'Polish', 'Portuguese(Brazil)', 'Portuguese(Portugal)', 'Romani',
    'Romanian', 'Russian', 'Sanskrit', 'Serbian', 'Sinhalese', 'Slavic', 'Slovak', 'Slovenian',
    'Spanish', 'Swahili', 'Swedish', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Tibetan', 'Tongan',
    'Traditional Chinese', 'Turkish', 'Turkmen', 'Udmurt', 'Ukrainian', 'Urdu', 'Uyghur', 'Uzbek',
    'Vietnamese', 'Welsh', 'Yiddish', 'Zulu'];
  for (let i in languages) {
    Languages.insert({name: languages[i]});
  }
}