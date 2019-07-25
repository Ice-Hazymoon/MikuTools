export default function(size) {
    const KB = size / 1024;
    const MB = KB / 1024;
    const GB = MB / 1024;
    const TB = GB / 1024;
    if (MB < 1) {
        return `${KB.toFixed(2)} KB`;
    } else if (GB < 1) {
        return `${MB.toFixed(2)} MB`;
    } else if (TB < 1) {
        return `${GB.toFixed(2)} GB`;
    } else {
        return `${TB.toFixed(2)} TB`;
    }
}
