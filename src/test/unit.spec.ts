import {dateNormalizer} from '../utils/dateNormalizer'

describe('check dateNormalizer', () => {
    it('returns iso date for valid date inpit ', () => {
        const time = '2022-10-10'
        expect(dateNormalizer(time)).toEqual('2022-10-10T00:00:00.000Z')
    })

    it('throws error for valid date passed', () => {
        const haraamTime = 'pig'
        expect(() => dateNormalizer(haraamTime)).toThrow('not a valid date')
    })

})