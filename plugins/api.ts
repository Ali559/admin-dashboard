export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const api = $fetch.create({
        baseURL: config.public.apiUrl as string,
        headers: {
            'x-key': config.public.apiKey as string
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