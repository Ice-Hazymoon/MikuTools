import baidupush from '../middleware/baidupush';
baidupush({
    route: {
        path: window.location.pathname
    }
});
