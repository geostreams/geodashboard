// @flow
import type { SensorType, ParameterType } from './flowtype';

export default function sanitizeParameters(sensorsData: SensorType[], parameters: ParameterType[]){
    const params = [];
    sensorsData.map(s => {
        s.parameters.map(p => {
            // check if parameters exists already_
            const found = params.some(e => e.id === p);
            if (p === null) {
                console.log(`Found sensor ${s.id} with null parameters`);

            } else if (!found) {
                const parameter = parameters.find(x => x.name === p);
                if (parameter && parameter.name !== '') {
                    params.push({ id: p, label: parameter.title || '', unit: parameter.unit });
                }
            }
        });
    });
    // sorting alphabetically by title
    return params.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
}
