import axios from 'axios';

const url = process.env.VUE_APP_ROOT_API + 'entries/';

class EntryService {
    // get entries
    static getEntries() {
        return new Promise((resolve, reject) => {
           axios.get(url).then((res) => {
               const data = res.data;
               resolve(
                   data.map(entry => ({
                       ...entry,
                       createdAt: new Date(entry.createdAt)
                   }))
               );
           })
           .catch((err) => {
               reject(err);
           })
        })
    }

    // create entry
    static insertEntry(text) {
        return axios.post(url, {
            text
        });
    }

    // delete entry
    static deleteEntry(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default EntryService;