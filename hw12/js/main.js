'use strict'

const MODE_MOBILE = 0;
const MODE_MEDIUM = 1;
const MODE_LARGE = 2;

document.onload = function() {
    const mode = determineWindowMode();
    adjustWidthDependentElements( mode );
}

function determineWindowMode() {
    const width = window.innerWidth;
    if ( width < 461 ) {
        return MODE_MOBILE;
    } else if ( width < 1200 ) {
        return MODE_MEDIUM;
    } else {
        return MODE_LARGE;
    }
}