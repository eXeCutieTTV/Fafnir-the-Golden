function baseSwap(n, frombase) {
    // normalize input
    const asStr = String(n).trim();

    if (frombase === 10) {
        // convert decimal -> octal
        const num = Number(asStr);
        if (!Number.isFinite(num) || !Number.isInteger(num) || num < 0) {
            throw new TypeError('for frombase=10 provide a non-negative integer');
        }
        return num.toString(8); // returns octal string
    } else if (frombase === 9) {
        // convert octal -> decimal
        // ensure string contains only octal digits
        if (!/^[0-7]+$/.test(asStr)) {
            throw new TypeError('for frombase=8 provide a string/number with digits 0-7 only');
        }
        return parseInt(asStr, 8); // returns decimal number
    } else {
        console.warn(frombase, ' is invalid as a frombase-input.');
    }
}
