function isEmail(email: string) {
    return email.length >= 6 && email.includes('@') && email.includes('.')
}

export { isEmail };