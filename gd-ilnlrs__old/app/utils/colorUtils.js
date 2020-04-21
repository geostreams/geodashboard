/*
 * @flow
 */

/**
 * Blend two colors using rgba to rgb conversion
 * @param colors - An array of colors to combine
 * @param opacity - An array of opacity (alpha values) to apply to each corresponding color
 * @returns {string} The rgba representation of the combination of the colors
 */
export function applyColors(colors: Array<string>, opacity: Array<number>) {

    //look at https://coderwall.com/p/z8uxzw/javascript-color-blender, alpha composting, and
    //http://marcodiiga.github.io/rgba-to-rgb-conversion
    //TODO: validate input to iterate through colors and opacity to combine more than two colors

    let color1 = hexToRgba(colors[0].substr(1, 6), opacity[0]);
    let color2 = hexToRgba(colors[1].substr(1, 6), opacity[1]);
    let white_background = [255, 255, 255, 1];

    let rgb_color1 = rgbaToRgb(white_background, color1);
    let rgb_color2 = rgbaToRgb(white_background, color2);

    let result = [
        Math.round(0.5 * rgb_color1[0] + 0.5 * rgb_color2[0]),
        Math.round(0.5 * rgb_color1[1] + 0.5 * rgb_color2[1]),
        Math.round(0.5 * rgb_color1[2] + 0.5 * rgb_color2[2]),
        1
    ];
    return ("rgba(" + result[0] + "," + result[1] + "," + result[2] + "," + result[3] + ")");
}


/**
 * Blend a color into a background
 * @param rgb_background
 * @param rgba_color
 * @returns array representation of rgb
 */
export function rgbaToRgb(rgb_background: Array<number>, rgba_color: Array<number>) {
    let alpha = rgba_color[3];
    return (
        [
            (1 - alpha) * rgb_background[0] + alpha * rgba_color[0],
            (1 - alpha) * rgb_background[1] + alpha * rgba_color[1],
            (1 - alpha) * rgb_background[2] + alpha * rgba_color[2]
        ]);
}

/**
 * Convert a hex color representation to rgba
 * @param color - Hex color
 * @param alpha - Opacity value
 * @returns array representation of rgba
 */
export function hexToRgba(color: string, alpha: number) {
    let bigint = parseInt(color, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b, alpha];
}
