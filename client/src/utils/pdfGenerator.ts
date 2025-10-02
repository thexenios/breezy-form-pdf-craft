import jsPDF from 'jspdf';

interface FormData {
  vision: string;
  mission: string;
  why: string;
  values: string;
  valuesInAction: string;
  antiValues: string;
  voice: string;
  phraseSound: string;
  antiVoice: string;
}

export const generateCommunicationGuidePDF = (formData: FormData) => {
  const doc = new jsPDF();
  
  // Set up colors
  const orangeColor: [number, number, number] = [198, 93, 33];
  const whiteColor: [number, number, number] = [255, 255, 255];
  const grayColor: [number, number, number] = [180, 180, 180];
  
  // Create gradient-like background effect
  doc.setFillColor(65, 105, 145);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Add main title
  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Get to', 20, 40);
  
  doc.setFontSize(48);
  doc.setTextColor(198, 93, 33);
  doc.text('KNOW ME', 20, 65);
  
  // Add date
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  doc.text(`Created: ${new Date().toLocaleDateString()}`, 150, 20);
  
  let yPosition = 90;
  
  const addMainSection = (title: string, content: string, yPos: number) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(198, 93, 33);
    doc.text(`${title}:`, 20, yPos);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    const splitText = doc.splitTextToSize(content, 85);
    doc.text(splitText, 20, yPos + 8);
    
    return yPos + splitText.length * 4 + 20;
  };
  
  // Add sections
  yPosition = addMainSection('My North Star', formData.vision, yPosition);
  yPosition = addMainSection('My Mission', formData.mission, yPosition);
  yPosition = addMainSection('My Why', formData.why, yPosition);
  
  const toneContent = `${formData.voice}\n\nPhrase that sounds like me: ${formData.phraseSound}`;
  yPosition = addMainSection('My Tone', toneContent, yPosition);
  
  // Values section
  if (yPosition > 220) {
    doc.addPage();
    doc.setFillColor(65, 105, 145);
    doc.rect(0, 0, 210, 297, 'F');
    yPosition = 30;
  }
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(198, 93, 33);
  doc.text('Core Values', 20, yPosition);
  yPosition += 20;
  
  // Parse and display values as pillars
  const values = formData.values.split(',').map(v => v.trim()).filter(v => v);
  const pillarsPerRow = 3;
  const pillarSpacing = 60;
  
  values.forEach((value, index) => {
    const row = Math.floor(index / pillarsPerRow);
    const col = index % pillarsPerRow;
    const x = 20 + (col * pillarSpacing);
    const y = yPosition + (row * 40);
    
    doc.setFillColor(198, 93, 33);
    doc.rect(x + 15, y + 15, 20, 8, 'F');
    
    doc.setFillColor(180, 180, 180);
    doc.rect(x + 17, y + 23, 16, 2, 'F');
    doc.rect(x + 17, y + 25, 16, 2, 'F');
    doc.rect(x + 17, y + 27, 16, 2, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(198, 93, 33);
    const textWidth = doc.getTextWidth(value);
    doc.text(value, x + 25 - (textWidth / 2), y + 35);
  });
  
  // Additional sections on second page
  if (formData.valuesInAction || formData.antiValues || formData.antiVoice) {
    doc.addPage();
    doc.setFillColor(65, 105, 145);
    doc.rect(0, 0, 210, 297, 'F');
    
    let page2Y = 30;
    
    if (formData.valuesInAction) {
      page2Y = addMainSection('Values in Action', formData.valuesInAction, page2Y);
    }
    
    if (formData.antiValues) {
      page2Y = addMainSection('Anti-Values', formData.antiValues, page2Y);
    }
    
    if (formData.antiVoice) {
      page2Y = addMainSection('Anti-Voice', formData.antiVoice, page2Y);
    }
  }
  
  doc.save('personal_communication_guide.pdf');
};
