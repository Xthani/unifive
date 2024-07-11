import {LogosRes} from "@src/hooks/types";

export const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
};

export const getPackedArraysOfLogos = (logosList: Array<LogosRes> | any, desiredArrayLength = 10): Array<Array<LogosRes>> | any => {
    const result: Array<Array<LogosRes>> = []

    if (!logosList?.length) return result

    let currentIndex = 0
    for (const item of logosList) {
        if (!result[currentIndex]) {
            result[currentIndex] = [item]
        } else if (result[currentIndex].length === desiredArrayLength) {
            currentIndex += 1
            result[currentIndex] = [item]
        } else {
            result[currentIndex].push(item)
        }
    }

    return result
}
