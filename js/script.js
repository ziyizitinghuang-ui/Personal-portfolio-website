document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }
});

function downloadPDF() {
  const original = document.getElementById('resume-to-print');
  if (!original || typeof html2pdf === 'undefined') return;

  const clone = original.cloneNode(true);
  clone.id = 'resume-print-clone';

  clone.querySelectorAll('.tape').forEach((el) => el.remove());

  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.width = '190mm';
  clone.style.maxWidth = '190mm';
  clone.style.boxSizing = 'border-box';
  clone.style.background = '#F3F0EA';
  clone.style.boxShadow = 'none';
  clone.style.transform = 'none';
  clone.style.padding = '12mm';
  clone.style.margin = '0';

  clone.querySelectorAll('*').forEach((el) => {
    el.style.boxShadow = 'none';
  });

  document.body.appendChild(clone);

  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'Ziting_Huang_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F3F0EA',
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: {
      mode: ['css', 'legacy']
    }
  };

  html2pdf()
    .set(opt)
    .from(clone)
    .save()
    .then(() => {
      document.body.removeChild(clone);
    })
    .catch((error) => {
      console.error('PDF export failed:', error);
      document.body.removeChild(clone);
    });
}