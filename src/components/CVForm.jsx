function CVForm(props) {
  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">المعلومات الأساسية</h2>
      <div class="space-y-4">
        <input
          type="text"
          placeholder="الاسم الكامل"
          value={props.fullName()}
          onInput={(e) => props.setFullName(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <input
          type="text"
          placeholder="المسمى الوظيفي المرغوب"
          value={props.jobTitle()}
          onInput={(e) => props.setJobTitle(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
      </div>
    </div>
  );
}

export default CVForm;