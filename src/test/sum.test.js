import assert from 'assert';
import {sum} from './sum';

describe('coveralls testing', (done)=>{

    it('makes sum of two numbers', ()=>{

        assert(sum(2, 3) === 5);
    });
});