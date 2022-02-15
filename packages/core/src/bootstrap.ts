import Tracert from "./tracert";

function bootstrap(options?: CORE.BootstrapOptions) {
    const opts = options || {};
    const tracert = new Tracert(opts);
    if (!window.tiangong_tracert) {
        window.tiangong_tracert = tracert;
    }

    return tracert;
}

export default bootstrap();
