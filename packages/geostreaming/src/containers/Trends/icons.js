// @flow

export const iconColors = {
    up: '#FAE70B',
    down: '#29ABE2',
    noData: 'grey',
    overThreshold: '#ED2026'
};

const up = encodeURIComponent(
    `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 0 L 20 20 L 0 20" stroke-width="0" fill="${iconColors.up}" />
    </svg>`
);

const down = encodeURIComponent(
    `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 20 L 20 00 L 0 0" stroke-width="0" fill="${iconColors.down}" />
    </svg>`
);

const noData = encodeURIComponent(
    `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" stroke-width="0" fill="${iconColors.noData}" />
    </svg>`
);

const overThresholdUp = encodeURIComponent(
    `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 0 L 20 20 L 0 20" stroke-width="0" fill="${iconColors.overThreshold}" />
    </svg>`
);

const overThresholdDown = encodeURIComponent(
    `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 20 L 20 00 L 0 0" stroke-width="0" fill="${iconColors.overThreshold}" />
    </svg>`
);

const overThresholdUpDown = encodeURIComponent(
    `<svg width="35" height="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10 0 L 20 20 L 0 20" stroke-width="0" fill="${iconColors.overThreshold}" />
        <path d="M 15 0 L 35 0 L 25 20" stroke-width="0" fill="${iconColors.overThreshold}" />
    </svg>`
);

export default {
    up,
    down,
    noData,
    noChange: noData,
    overThresholdUp,
    overThresholdDown,
    overThresholdUpDown
};
