document.addEventListener('DOMContentLoaded', () => {
    const audioFile = document.getElementById('audioFile');
    const audioPreview = document.getElementById('audioPreview');
    const translateBtn = document.getElementById('translateBtn');
    const originalText = document.getElementById('originalText');
    const translatedText = document.getElementById('translatedText');
    const loading = document.getElementById('loading');

    audioFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create object URL for audio preview
            const audioUrl = URL.createObjectURL(file);
            audioPreview.src = audioUrl;
            audioPreview.style.display = 'block';
            translateBtn.disabled = false;
        }
    });

    translateBtn.addEventListener('click', async () => {
        const file = audioFile.files[0];
        if (!file) return;

        // Show loading state
        loading.style.display = 'block';
        translateBtn.disabled = true;
        originalText.textContent = '';
        translatedText.textContent = '';

        // Create form data
        const formData = new FormData();
        formData.append('audio', file);

        try {
            const response = await fetch('/translate-audio', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                originalText.textContent = data.original_text;
                translatedText.textContent = data.translated_text;
            } else {
                throw new Error(data.error || 'Translation failed');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            loading.style.display = 'none';
            translateBtn.disabled = false;
        }
    });
});