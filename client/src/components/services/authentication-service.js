import { post, remove, get } from '../../data/crud';

class AuthenticationService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/auth';
        this.loginUrl = `${this.baseUrl}/login`;
        this.registerUrl = `${this.baseUrl}/admin/signup`;
        this.editWeddingUrl = `${this.baseUrl}/admin/edit`;
        this.deleteWeddingUrl = `${this.baseUrl}/admin/delete`
        this.allWeddingsUrl = `${this.baseUrl}/admin/all`;
    }
    login(credentials) {
        return post(this.loginUrl, credentials);
    }
    register(credentials) {
        return post(this.registerUrl, credentials);
    }
    edit(id, credentials) {
        return post(`${this.editWeddingUrl}${id}`, credentials);
    }
    delete(id, credentials) {
        return remove(`${this.deleteWeddingUrl}${id}`, credentials);
    }
    getAllWeddings() {
        return get(this.allWeddingsUrl);
    }

}
export default AuthenticationService;