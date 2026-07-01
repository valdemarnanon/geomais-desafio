import { httpClient } from "./httpClient"

const API_URL = 'http://localhost:3333/pessoas'

export const PessoaProvider = {
    get () {
        return httpClient.get(API_URL)
    },
    update (id: number, body: unknown) {
        return httpClient.put(`${API_URL}/${id}`, body)
    },
    create (body: unknown) {
        return httpClient.post(`${API_URL}`, body)
    },
    delete (id: number) {
        return httpClient.delete(`${API_URL}/${id}`)
    }
}