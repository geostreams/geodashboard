// @flow
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

interface Options {
    filename?: string;
    onSuccess?: () => void;
}

export const htmlToPdf = (element: HTMLElement, options?: Options) => {
    const { filename, onSuccess } = options || {};
    html2canvas(element, {
        logging: false,
        useCORS: true
    }).then((canvas) => {
        const pdf = new JsPDF('p', 'pt', 'letter');

        // The following loop handles arrangement of pages and is takes from
        // https://stackoverflow.com/a/34934497/2074794
        for (let i = 0; i <= element.clientHeight / 980; i += 1) {
            const srcImg = canvas;
            const sX = 0;
            const sY = 980 * i; // start 980 pixels down for every new page
            const sWidth = 900;
            const sHeight = 980;
            const dX = 0;
            const dY = 0;
            const dWidth = 900;
            const dHeight = 980;

            const onePageCanvas = document.createElement('canvas');
            onePageCanvas.setAttribute('width', '900');
            onePageCanvas.setAttribute('height', '980');
            const ctx = onePageCanvas.getContext('2d');
            // Slice the generated canvas into 980x980 chunks. Each chunk is put in a new page.
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
            ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

            // The second arg is the png image quality
            const canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0);

            const width = onePageCanvas.width;
            const height = onePageCanvas.clientHeight;

            // If on anything other than the first page, add another page
            if (i > 0) {
                pdf.addPage([612, 791]); // 8.5" x 11" in pts (in * 72)
            }
            // switch to the new page and add its content
            pdf.setPage(i + 1);
            pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));
        }

        pdf.save(filename || 'output.pdf');
        if (onSuccess) {
            onSuccess();
        }
    });
};
