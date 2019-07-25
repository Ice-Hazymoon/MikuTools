import _ from 'lodash';

export default function({ route, store }) {
    let toolsList = [];
    store.state.tools.forEach(tool => {
        toolsList = toolsList.concat(tool.list);
    });
    let currentTool = _.chain(toolsList)
        .find({
            path: route.path
        })
        .value();

    store.commit('SET_STORE', {
        key: 'currentTool',
        value: currentTool ? currentTool : false
    });
}
