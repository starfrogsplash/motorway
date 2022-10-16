const dateNormalizer = (timeStamp: string) => {
    if(isNaN(Date.parse(timeStamp))) throw new Error('not a valid date')
    return new Date(timeStamp).toISOString()
}

export {
    dateNormalizer
}