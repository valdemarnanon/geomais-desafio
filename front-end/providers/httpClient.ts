async function getResponseData (response: Response) {
    if (response.status === 204) {
        return null
    }

    const contentType = response.headers.get('content-type')

    if (!contentType?.includes('application/json')) {
        return null
    }

    return response.json()
}

export const httpClient = {
    async get (url: string) {
        const response = await fetch(url)
        const data = await getResponseData(response)

        return {
            ok: response.ok,
            status: response.status,
            data
        }
    },

    async put (url: string, body: unknown) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await getResponseData(response)

        return {
            ok: response.ok,
            status: response.status,
            data
        }
    },

    async post (url: string, body: unknown) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await getResponseData(response)

        return {
            ok: response.ok,
            status: response.status,
            data
        }
    },

    async delete (url: string) {
        const response = await fetch(url, {
            method: 'DELETE'
        })

        const data = await getResponseData(response)

        return {
            ok: response.ok,
            status: response.status,
            data
        }
    }
}
