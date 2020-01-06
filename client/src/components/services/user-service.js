import { get } from '../../data/crud';

class UserService {
    constructor() {

        this.baseUrl = 'http://localhost:5000/user';
        this.userWeddingUrl = `${this.baseUrl}/wedding-homepage`;
    }

    getUserWedding() {
        return get(`${this.userWeddingUrl}`)
    }
}
export default UserService;