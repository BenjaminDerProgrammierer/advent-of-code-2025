export default (input: string): number => {
    const freshRanges = input
        .split("\n\n")[0]                               // first part of data
        .split("\n")                                    // each line
        .map(range => range.split('-').map(Number));    // [start, end]


    freshRanges.sort((a, b) => a[0] - b[0]);
    const mergedRanges: [number, number][] = [];

    for (const [start, end] of freshRanges) {
        if (mergedRanges.length === 0 || mergedRanges.at(-1)![1] < start) {
            // first range OR last end is smaller than current start -> just append
            mergedRanges.push([start, end]);
        } else {
            // last start is greater than current start -> ranges overlap, find the new end
            mergedRanges.at(-1)![1] = Math.max(mergedRanges.at(-1)![1], end);
        }
    }

    let count = 0;
    for (const [start, end] of mergedRanges) {
        count += end - start + 1;
    }

    return count;
}