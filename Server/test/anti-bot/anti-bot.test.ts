import * as denyIntruder from '../../controllers/denyIntruder';


describe('Testing denyIntruder functions', () => {
    describe('Testing isInhumanTypingSpeed', () => {
        test('100-50 <= 50 is true', () => {
            expect(denyIntruder.isInhumanTypingSpeed(50,100,50)).toBe(true);
        })
        test('500-490 <= 50 is true', () => {
            expect(denyIntruder.isInhumanTypingSpeed(490,500,50)).toBe(true);
        })
        test('100-10 <= 50 is false', () => {
            expect(denyIntruder.isInhumanTypingSpeed(10,100,50)).toBe(false);
        })

        describe('Testing isInhumanTypingSpeed with real date', () => {
            let date1 = new Date().getTime();
            let date2 = new Date().getTime();

            test('DateNow - DateNow is true', () => {
                expect(denyIntruder.isInhumanTypingSpeed(date2,date1,50)).toBe(true);
            })
            test('DateNow - (DateNow-100) is false', () => {
                expect(denyIntruder.isInhumanTypingSpeed(date2-100,date1,50)).toBe(false);
            })



        })
       
    })

})