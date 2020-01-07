import { get } from '../../data/crud';

class UserService {
    constructor() {

        this.baseUrl = 'https://wedding-buddy.herokuapp.com/user';
        this.userWeddingUrl = `${this.baseUrl}/wedding-homepage`;
    }

    getUserWedding() {
        return get(`${this.userWeddingUrl}`)
    }
}
export default UserService;