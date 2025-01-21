# gdocs-to-gform
# Create Quiz from Google Docs to Google Form

This script automates the process of creating a quiz in Google Form from a Google Docs document. It supports questions with images, multiple-choice answers, and assigns points to each question. Additionally, the script divides the quiz into sections, where each section contains a maximum of 10 questions.

## Features
- Automatically converts a Google Docs document into a Google Form quiz.
- Supports images for both questions and answer choices.
- Automatically assigns points to questions based on the document's structure.
- Creates sections in the Google Form after every 10 questions.
- Ensures all questions are mandatory.

## Installation

1. **Open Google Apps Script**
   - In your Google Docs, go to `Extensions > Apps Script`.

2. **Paste the Script**
   - Copy and paste the script provided into the Apps Script editor.

3. **Save the Script**
   - Save the project with a name like `Quiz Generator`.

4. **Grant Permissions**
   - Click the play ▶️ button to run the script for the first time.
   - Grant the necessary permissions when prompted.

## Google Docs Format
To ensure the script runs correctly, follow this format in your Google Docs:

### Example Format:
```text
1. What is the color of the sky?
   a. Red
   b. Blue (Benar)
   c. Green
   d. Yellow
Poin: 5

(Gambar untuk soal, jika ada)

2. What is 2 + 2?
   a. 3
   b. 4 (Benar)
   c. 5
   d. 6
Poin: 10

(Gambar untuk jawaban, jika ada)
```

### Key Points:
- **Questions:** Start with a number followed by a period, e.g., `1.`, `2.`.
- **Answers:** Use letters (`a.`, `b.`, etc.) for each choice.
- **Correct Answer:** Add `(Benar)` next to the correct choice.
- **Points:** Include a `Poin:` line after the choices.
- **Images:** Place the image immediately above the related question or answer.

## Usage

1. **Run the Script:**
   - Open the Apps Script editor and run the `createQuizFromDoc` function.

2. **Check the Logs:**
   - After running the script, check the `Logs` to get the URL of the newly created Google Form.
   - Example:
     ```
     Form created: https://docs.google.com/forms/d/<form-id>/edit
     ```

3. **Edit the Form:**
   - Open the URL to verify or manually adjust the form (e.g., add images).

## Notes
- The script skips images for now, and you'll need to add them manually in the Google Form.
- If you encounter errors, ensure your Google Docs format matches the required structure.
- The script creates a new section in the form every 10 questions automatically.

## Troubleshooting

### Error: `Invalid form data. Please enable Quiz settings and try again.`
Ensure the Google Form's quiz settings are enabled:
- Go to `Settings > Quizzes` in the Form editor.
- Enable the `Make this a quiz` option.

### Logs
If there are issues, use the logs in the Apps Script editor to debug:
- Open the editor.
- Go to `View > Logs`.

---

## License
This script is free to use and modify under the [MIT License](https://opensource.org/licenses/MIT).
