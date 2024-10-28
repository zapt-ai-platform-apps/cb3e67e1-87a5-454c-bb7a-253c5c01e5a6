import { createEffect } from 'solid-js';

function CVPreview(props) {
  let html2pdf;

  createEffect(async () => {
    const module = await import('html2pdf.js');
    html2pdf = module.default;
  });

  const downloadPDF = () => {
    const element = document.createElement('div');
    element.innerHTML = props.cvContent();
    const opt = {
      margin: 0,
      filename: 'CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">معاينة السيرة الذاتية</h2>
      <div innerHTML={props.cvContent()} class="prose max-w-full"></div>
      <button
        onClick={downloadPDF}
        class="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        تنزيل السيرة الذاتية
      </button>
    </div>
  );
}

export default CVPreview;