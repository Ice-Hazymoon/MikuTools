import jsQR from 'jsqr';

export default function(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            try {
                const imageData = context.getImageData(
                    0,
                    0,
                    image.width,
                    image.height
                );
                const qrCode = jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height
                );
                resolve(qrCode);
            } catch (error) {
                reject(error);
            }
        };
        image.src = url;
    });
}
