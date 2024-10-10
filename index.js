const handleSvgToPng = () => {
      
    const svgImage = document.querySelector("img")
    if(!svgImage) return

    const canvas = svgToPNG(svgImage)
    if(!canvas) return

    const context = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Ensure it's cross-origin if needed
    img.src = svgImage.src;
  
    img.onload = () => {
        context?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to PNG and trigger download
        const pngUrl = canvas.toDataURL('image/png');
        downloadPNG(pngUrl)
    };
};

const svgToPNG = (svgImage) => {
    if (!svgImage) return undefined

    const canvas = document.createElement('canvas');

    // Set canvas dimensions based on the SVG image size
    const width = svgImage.width;
    const height = svgImage.height;
    canvas.width = width;
    canvas.height = height;

    return canvas
}

const downloadPNG = (url) => {
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = `result.png`;
    // link.click();
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `result.png`;
            link.click();
            URL.revokeObjectURL(link.href); // Clean up the Blob URL
        })
        .catch(error => console.error('Error downloading PNG:', error));
}