import { promisifyAll } from 'bluebird';

export default function promisify(Model) {
    promisifyAll(Model, {
        filter: name => name !== 'validate'
    });
}
