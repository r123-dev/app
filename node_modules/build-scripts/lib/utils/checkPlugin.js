import _ from 'lodash';
const checkPluginValue = (plugins) => {
    let flag;
    if (!_.isArray(plugins)) {
        flag = false;
    }
    else {
        flag = plugins.every((v) => {
            let correct = _.isArray(v) || _.isString(v) || _.isFunction(v) || _.isObject(v);
            if (correct && _.isArray(v)) {
                correct = _.isString(v[0]);
            }
            return correct;
        });
    }
    if (!flag) {
        throw new Error('plugins did not pass validation');
    }
};
export default checkPluginValue;
