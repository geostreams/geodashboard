/*
 * @flow
 */

import React from 'react';


export function handleParamsWithItalics(parameter: any) {
    let parameter_label_array = [];
    let parameter_label = parameter;
    if (parameter_label.includes('<i>')) {
        parameter_label = parameter_label.replace('<i>', '|<i>');
        parameter_label = parameter_label.replace('</i>', '|');
        parameter_label_array = parameter_label.split('|');
        for (let i = 0; i < parameter_label_array.length; i++) {
            if (parameter_label_array[i].includes('<i>')) {
                parameter_label_array[i] = <em key={parameter}>{parameter_label_array[i].replace('<i>', '')}</em>;
            }
        }
    } else {
        parameter_label_array[0] = parameter_label;
    }

    return parameter_label_array;
}

export function removeItalicsFromParams(parameter: string) {
    let parameter_label = parameter;
    if (parameter_label.includes('<i>')) {
        parameter_label = parameter_label.replace('<i>', '');
        parameter_label = parameter_label.replace('</i>', '');
    }

    return parameter_label;
}
