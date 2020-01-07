import { get, post, remove } from '../../data/crud';

class WeddingService {
    constructor() {

        this.baseUrl = 'https://wedding-buddy.herokuapp.com/weddings';
        this.allWeddingsUrl = `${this.baseUrl}/all`;
        this.editWeddingUrl = `${this.baseUrl}/edit`;
        this.deleteWeddingUrl = `${this.baseUrl}/delete/`;
        this.userWeddingUrl='https://wedding-buddy.herokuapp.com/';
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
    getUserWedding(){
        return get(`${this.userWeddingUrl}`)
    }
}
export default WeddingService;