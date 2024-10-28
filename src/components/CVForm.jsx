import { createSignal } from 'solid-js';

function CVForm(props) {
  const [localFormData, setLocalFormData] = createSignal(props.formData());

  const handleInputChange = (field, value) => {
    setLocalFormData({ ...localFormData(), [field]: value });
    props.setFormData({ ...localFormData(), [field]: value });
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">الاستمارة</h2>
      <div class="space-y-4">
        <input
          type="text"
          placeholder="الاسم الكامل"
          value={localFormData().fullName || ''}
          onInput={(e) => handleInputChange('fullName', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <input
          type="text"
          placeholder="العنوان"
          value={localFormData().address || ''}
          onInput={(e) => handleInputChange('address', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={localFormData().email || ''}
          onInput={(e) => handleInputChange('email', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <input
          type="tel"
          placeholder="رقم الهاتف"
          value={localFormData().phone || ''}
          onInput={(e) => handleInputChange('phone', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        <textarea
          placeholder="الملخص الشخصي"
          value={localFormData().summary || ''}
          onInput={(e) => handleInputChange('summary', e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
        {/* يمكن إضافة المزيد من الحقول مثل التعليم، الخبرات، المهارات، إلخ */}
      </div>
    </div>
  );
}

export default CVForm;