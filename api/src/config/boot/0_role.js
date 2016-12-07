import path from 'path';
import requireDir from 'require-dir';
import promisify from '../../utils/promisify';

module.exports = app => {
    const roles = requireDir(path.join(__dirname, '../..', 'common', 'roles'));
    const { Role, RoleMapping } = app.models;
    promisify(RoleMapping);
    promisify(Role);

    Object.keys(roles).forEach(r => {
        const { name, default: role } = roles[r];
        Role.registerResolver(name, role);
    });
};
