import Vue from 'vue'
import html2pdf from 'html2pdf.js'

export default ({ app }, inject) => {
  app.toPdf = (element, filename) => html2pdf(element, {
    margin:       1,
    filename:     `${filename}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { dpi: 192, letterRendering: true },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  });
}
