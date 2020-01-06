import { get, post, remove } from '../../data/crud';

class GuestListService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/guest-list';
        this.allGuestsUrl = `${this.baseUrl}/all/`;
        this.createGuestUrl = `${this.baseUrl}/create`;

    }
    getAllGuests(credentials) {
        return get(this.allGuestsUrl, credentials);
    }
    create(credentials) {
        return post(this.createGuestUrl, credentials);
    }
    delete(id) {
        console.log(id);
        return remove(`${this.allGuestsUrl}delete/${id}`);
    }
    statusChange(id, credentials) {
        return post(`${this.allGuestsUrl}${id}`, credentials)
    }
}
export default GuestListService;