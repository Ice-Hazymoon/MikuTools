import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default content => {
    return marked(content, {
        breaks: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    });
};
