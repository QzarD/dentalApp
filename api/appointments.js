import axios from '../core/axios';

export default {
    get: () => axios.get('/appointments'),
    remove: id => axios.delete('/appointments/' + id),
    add: values => axios.post('/appointments', values),
    edit: (id, values) => axios.patch('/appointments/:id' +id, values)
};
