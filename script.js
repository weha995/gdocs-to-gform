function createQuizFromDoc() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  // Membuat Google Form baru dan mengaktifkan pengaturan kuis
  const form = FormApp.create('Kuis Otomatis');
  form.setIsQuiz(true); // Aktifkan kuis

  let currentQuestion = '';
  let choices = [];
  let points = 0;
  let questionNumber = 1; // Penomoran otomatis untuk soal
  let questionImage = null; // Gambar untuk soal
  let choiceImages = []; // Gambar untuk pilihan jawaban
  let questionCountInSection = 0; // Hitungan soal dalam section

  paragraphs.forEach(paragraph => {
    const text = paragraph.getText().trim();

    // Deteksi gambar
    if (paragraph.getNumChildren() > 0 && paragraph.getChild(0).getType() === DocumentApp.ElementType.INLINE_IMAGE) {
      const imageBlob = paragraph.getChild(0).asInlineImage().getBlob();
      
      // Jika belum ada pertanyaan, gambar dianggap untuk soal
      if (!currentQuestion) {
        questionImage = imageBlob;
      } else {
        // Jika ada pilihan jawaban, gambar dianggap untuk pilihan terakhir
        choiceImages.push(imageBlob);
      }
      return;
    }

    // Deteksi baris poin
    if (/^Poin:\s*\d+/i.test(text)) {
      points = parseInt(text.match(/\d+/)[0], 10);

      // Tambahkan pertanyaan ke Google Form
      if (currentQuestion && choices.length > 0) {
        const item = form.addMultipleChoiceItem();
        const correctAnswer = choices.find(choice => choice.isCorrect);
        item.setTitle(`${questionNumber}. ${currentQuestion}`)
            .setChoices(choices.map((choice, index) => {
              const choiceOption = item.createChoice(choice.text, choice.isCorrect);
              // Tambahkan gambar ke pilihan jika ada
              if (choiceImages[index]) {
                choiceOption.setImage(choiceImages[index]);
              }
              return choiceOption;
            }))
            .setRequired(true) // Jawaban wajib diisi
            .setPoints(points); // Tambahkan poin

        // Tambahkan gambar ke soal jika ada
        if (questionImage) {
          item.addImageItem().setImage(questionImage);
        }

        // Tambahkan section baru setiap 10 soal
        questionCountInSection++;
        if (questionCountInSection === 10) {
          form.addSectionHeaderItem().setTitle(`Section ${Math.ceil(questionNumber / 10) + 1}`);
          questionCountInSection = 0; // Reset jumlah soal dalam section
        }

        // Reset untuk pertanyaan berikutnya
        currentQuestion = '';
        choices = [];
        points = 0;
        questionImage = null;
        choiceImages = [];
        questionNumber++;
      }
    }
    // Deteksi baris pertanyaan
    else if (/^\d+\.\s/.test(text)) {
      currentQuestion = text.replace(/^\d+\.\s*/, ''); // Hapus nomor dari dokumen
    }
    // Deteksi pilihan jawaban
    else if (/^[a-d]\.\s/.test(text)) {
      const match = text.match(/^[a-d]\.\s*(.*?)(\s*\(Benar\))?$/i);
      if (match) {
        choices.push({
          text: match[1].trim(),
          isCorrect: !!match[2] // Jika ada "(Benar)"
        });
      }
    }
  });

  Logger.log(`Form created: ${form.getEditUrl()}`);
}
