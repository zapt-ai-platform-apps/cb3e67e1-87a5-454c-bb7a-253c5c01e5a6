import { createSignal, Show } from 'solid-js';
import CVForm from './components/CVForm';
import LanguageSelector from './components/LanguageSelector';
import CVPreview from './components/CVPreview';

function App() {
  const [fullName, setFullName] = createSignal('');
  const [jobTitle, setJobTitle] = createSignal('');
  const [selectedLanguage, setSelectedLanguage] = createSignal('العربية');
  const [cvContent, setCvContent] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [currentPage, setCurrentPage] = createSignal('formPage');

  const generateCV = async () => {
    if (!fullName() || !jobTitle()) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName(),
          jobTitle: jobTitle(),
          language: selectedLanguage(),
        }),
      });
      const result = await response.json();
      setCvContent(result.cvContent);
      setCurrentPage('previewPage');
    } catch (error) {
      console.error('Error generating CV:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-gray-800">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">مولد السيرة الذاتية</h1>
        </div>
        <Show when={currentPage() === 'formPage'}>
          <CVForm
            fullName={fullName}
            setFullName={setFullName}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
          />
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <button
            onClick={generateCV}
            class={`w-full mt-6 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            <Show when={loading()}>جاري التوليد...</Show>
            <Show when={!loading()}>توليد السيرة الذاتية</Show>
          </button>
        </Show>
        <Show when={currentPage() === 'previewPage'}>
          <CVPreview cvContent={cvContent} />
          <button
            onClick={() => setCurrentPage('formPage')}
            class="w-full mt-6 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            العودة للتعديل
          </button>
        </Show>
      </div>
    </div>
  );
}

export default App;