abstract class ControllerBase<TService> {
    protected service: TService

    constructor(serviceClass: new () => TService) {
        this.service = new serviceClass()
    }
}

export default ControllerBase