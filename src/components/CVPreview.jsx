function CVPreview(props) {
  return (
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">معاينة السيرة الذاتية</h2>
      <div innerHTML={props.cvContent()} class="prose max-w-full"></div>
      <button
        onClick={() => {
          const link = document.createElement('a');
          const file = new Blob([props.cvContent()], { type: 'application/pdf' });
          link.href = URL.createObjectURL(file);
          link.download = 'CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        class="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        تنزيل السيرة الذاتية
      </button>
    </div>
  );
}

export default CVPreview;