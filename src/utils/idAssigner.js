export const setId = () => {
    return Date.now() + generateRandomString()
}

export const generateRandomString = () =>
    Math.random().toString(36).substring(2)
