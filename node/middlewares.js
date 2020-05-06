

class App {
    constructor(){
        this.middlewares = [];
    }

    use (callback){
        this.middlewares.push(callback);
    }

    compose () {
        return async ctx => {
            let createNext = (middleware, next) => {
                return async ctx => {
                    await middleware(ctx, next);
                }
            }
            let next = () => {
                return Promise.resolve();
            }
            for (var i = this.middlewares.length - 1; i >= 0; i--) {
                let middleware = this.middlewares[i];
                next = createNext(middleware, next)
            }
            await next();
        }
    }
}