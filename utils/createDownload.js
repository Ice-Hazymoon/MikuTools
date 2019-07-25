export default function(url, name) {
    let a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
}
