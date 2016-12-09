import promisify from '../../utils/promisify';

module.exports = User => {
    User.prototype.changePassword = function changePassword(newPassword, callback) {
        this.updateAttributeAsync('password', newPassword)
            .then(user => callback(null, { message: 'success' }))
            .catch(err => callback(err));
    };
    User.remoteMethod('changePassword', {
        isStatic: false,
        accepts: [
            { arg: 'newPassword', type: 'string' }
        ],
        returns: {
            arg: 'info', type: 'object', root: true
        },
        http: { path: '/password', verb: 'put' },
        description: 'Change password of a user'
    });

    promisify(User);
};
