export default defineNuxtPlugin((nuxtApp) => {

    const api = $fetch.create({
        baseURL: 'http://blog-panel.suly-soft.com.www67.your-server.de/api',
        headers: {
            'x-key': '2eee3f69-cd09-399f-a5b9-978d2c78c7f3'
        },
        async onResponseError({ response }) {
            if (response.status > 201) {
                await nuxtApp.runWithContext(() => {
                    useToastify(response._data?.errors.join(''), { type: 'error' })
                })
            }
        }
    })

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api
        }
    }
})