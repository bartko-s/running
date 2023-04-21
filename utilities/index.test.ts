import {timeExtractor} from "./index";


describe('Time extractor', () => {
    test('test - 60', () => {
        expect(timeExtractor(60)).toEqual({
            hours: 0,
            minutes: 1,
            seconds: 0,
            totalSeconds: 60,
            totalMinutes: 1,
        });
    });

    test('test - 61', () => {
        expect(timeExtractor(61)).toEqual({
            hours: 0,
            minutes: 1,
            seconds: 1,
            totalSeconds: 61,
            totalMinutes: 1,
        });
    });

    test('test - 59', () => {
        expect(timeExtractor(59)).toEqual({
            hours: 0,
            minutes: 0,
            seconds: 59,
            totalSeconds: 59,
            totalMinutes: 0,
        });
    });

    test('test - 239.99999999999997', () => {
        expect(timeExtractor(239.99999999999997)).toEqual({
            hours: 0,
            minutes: 4,
            seconds: 0,
            totalSeconds: 240,
            totalMinutes: 4,
        });
    });
});
