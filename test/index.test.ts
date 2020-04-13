import { equal, throws } from 'assert';
import httpBuildQuery from '../src/index';


describe('httpBuildQuery', () => {
    it('should return string on any input', () => {
        equal(typeof httpBuildQuery(null), 'string');
        equal(typeof httpBuildQuery(undefined), 'string');
        equal(typeof httpBuildQuery({}), 'string');
        equal(typeof httpBuildQuery([]), 'string');
    });

    it('should throw error on any type exept object and array', () => {
        throws(() => {
            //@ts-ignore
            httpBuildQuery('');
        });
        throws(() => {
            //@ts-ignore
            httpBuildQuery(1);
        });
        throws(() => {
            //@ts-ignore
            httpBuildQuery(false);
        });

        throws(() => {
            //@ts-ignore
            httpBuildQuery(true);
        })
    });


    it('should return empty string on null', () => {
        equal(httpBuildQuery(null), '');
    });

    it('should return empty string on undefined', () => {
        equal(httpBuildQuery(undefined), '');
    });

    it('should return empty string on empty object', () => {
        equal(httpBuildQuery({}), '');
    });

    it('should return empty string on empty array', () => {
        equal(httpBuildQuery([]), '');
    });

    it('booleans should be 1 or 0', () => {
        equal(httpBuildQuery({
            flag1: true,
            flag2: false
        }), 'flag1=1&flag2=0');
    });

    it('should return query string', () => {
        equal(httpBuildQuery({
            orderBy: [
                {column: 'createdAt', direction: 'desc'},
                {column: 'updatedAt', direction: 'asc'},
            ],
            where: [
                {column: 'title', operator: 'LIKE', value: 'hello'}
            ],
            flag: false
        }), 'orderBy[0][column]=createdAt&orderBy[0][direction]=desc&orderBy[1][column]=updatedAt&orderBy[1][direction]=asc&where[0][column]=title&where[0][operator]=LIKE&where[0][value]=hello&flag=0')
    });

    it('should return query string with separator ,', () => {
        equal(httpBuildQuery({
            orderBy: [
                {column: 'createdAt', direction: 'desc'},
                {column: 'updatedAt', direction: 'asc'},
            ],
            where: [
                {column: 'title', operator: 'LIKE', value: 'hello'}
            ],
            flag: false
        }, ','), 'orderBy[0][column]=createdAt,orderBy[0][direction]=desc,orderBy[1][column]=updatedAt,orderBy[1][direction]=asc,where[0][column]=title,where[0][operator]=LIKE,where[0][value]=hello,flag=0')
    });
});
