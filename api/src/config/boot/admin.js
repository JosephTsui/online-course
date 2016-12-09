import { props } from 'bluebird';
import promisify from '../../utils/promisify';

const USER_QUERY = {
    email: 'teaualune@gmail.com'
};

const USER_DATA = {
    ...USER_QUERY,
    username: 'teaualune',
    password: 'teaualune'
};

const ROLE_DATA = {
    name: 'admin'
};

module.exports = app => {
    const { user, Role, RoleMapping } = app.models;

    props({
        user: user.findOrCreateAsync({
            where: USER_QUERY
        }, USER_DATA),
        role: Role.findOrCreateAsync({
            where: ROLE_DATA
        }, ROLE_DATA)
    }).then(({user, role}) => {
        const ROLE_MAPPING_DATA = {
            principalType: RoleMapping.USER,
            principalId: user.id,
            roleId: role.id
        };
        RoleMapping.findOrCreate({
            where: ROLE_MAPPING_DATA
        }, ROLE_MAPPING_DATA, (err, roleMapping) => {
            if (err) {
                console.error(err);
            } else {
                console.info('Admin user:', user.id);
            }
        });
    }).catch(err => {
        console.error(err);
    });
};
