import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface DocItem {
  name: string;
  quantity: number;
  price: string;
  total: number;
}

interface DocData {
  type: string;
  number: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    nif?: string;
  };
  items: DocItem[];
  total: number;
}

export const generateDocumentPDF = (data: DocData) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(22);
  doc.text('MINISTORE', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(data.type.toUpperCase(), 105, 30, { align: 'center' });
  
  // Document Info
  doc.setFontSize(10);
  doc.text(`Número: ${data.number}`, 14, 45);
  doc.text(`Data: ${data.date}`, 14, 52);
  
  // Customer Info
  doc.text('CLIENTE:', 140, 45);
  doc.text(data.customer.name, 140, 52);
  doc.text(data.customer.email, 140, 59);
  doc.text(data.customer.phone, 140, 66);
  if (data.customer.nif) {
    doc.text(`NIF: ${data.customer.nif}`, 140, 73);
  }

  // Items Table
  const tableRows = data.items.map(item => [
    item.name,
    item.quantity.toString(),
    item.price,
    `${item.total.toLocaleString()} Kz`
  ]);

  autoTable(doc, {
    startY: 75,
    head: [['Produto', 'Qtd', 'Preço Unit.', 'Subtotal']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Total
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL: ${data.total.toLocaleString()} Kz`, 140, finalY);

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Obrigado pela sua preferência!', 105, 280, { align: 'center' });
  doc.text('Ministore - Luanda, Angola', 105, 285, { align: 'center' });

  return doc;
};

export const downloadPDF = (doc: any, filename: string) => {
  doc.save(filename);
};

export const shareByWhatsApp = (data: DocData) => {
  const message = `Olá! Aqui está o seu ${data.type} ${data.number}.\nTotal: ${data.total.toLocaleString()} Kz.\nObrigado pela preferência!`;
  const url = `https://wa.me/${data.customer.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
