document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const file = document.getElementById('imageInput').files[0];
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = "Processing...";

    if (file) {
        try {
            const reader = new FileReader();
            reader.onload = function() {
                const imageDataUrl = reader.result;

                Tesseract.recognize(
                    imageDataUrl,
                    'eng',
                    {
                        logger: m => console.log(m)
                    }
                ).then(({ data: { text } }) => {
                    const metrics = extractMetrics(text);
                    resultDiv.innerText = JSON.stringify(metrics, null, 2);
                }).catch(err => {
                    console.error(err);
                    resultDiv.innerText = 'Failed to process image';
                });
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error(error);
            resultDiv.innerText = 'An error occurred while processing the file';
        }
    } else {
        resultDiv.innerText = 'No file selected';
    }
});

function extractMetrics(text) {
 
    const metrics = {
        direct: 0,
        stories: 0,
       comentarios: 0,
        compartilhamento: 0,
       salvamentios: 0,
        likes: 0
    };

   
    if (text.includes('Direct')) metrics.direct++;
    if (text.includes('Stories')) metrics.stories++;
    if (text.includes('comentarios')) metrics.comments++;
    if (text.includes('compartilhamento')) metrics.shares++;
    if (text.includes('salvamentos')) metrics.saves++;
    if (text.includes('Likes')) metrics.likes++;

    return metrics;
}