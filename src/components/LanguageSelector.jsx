function LanguageSelector(props) {
  const languages = ['العربية', 'English', 'Français', 'Español'];

  return (
    <div class="mt-6">
      <h2 class="text-xl font-bold mb-2 text-purple-600">اختر لغة السيرة الذاتية</h2>
      <select
        value={props.selectedLanguage()}
        onInput={(e) => props.setSelectedLanguage(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
      >
        {languages.map((lang) => (
          <option value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;