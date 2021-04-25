/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Returns the current date formatted.
 * @param image: indicates if it is an image or no.
 * @returns {string}
 */
export function getFormattedDate(image = false) {
    const date = new Date();
    const month = fixDateFormat(date.getMonth());
    const day = fixDateFormat(date.getDate());
    const hour = fixDateFormat(date.getHours());
    const minute = fixDateFormat(date.getMinutes());
    const seconds = fixDateFormat(date.getSeconds());

    if (image){
        return String(date.getFullYear()) + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + seconds + '.png';
    }
    return String(date.getFullYear()) + '_' + month + '_' + day + '_' + hour + '_' + minute + '_' + seconds;
}


/**
 * Fix the bug when saving the date.
 */
export function fixDateFormat(date) {
    if (date < 10) {
        return '0' + date;
    } else {
        return date.toString();
    }
}
