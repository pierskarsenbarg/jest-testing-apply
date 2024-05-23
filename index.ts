import {RandomPassword} from "./RandomPassword"
import {RandomLength} from "./RandomLength";

const randomLength = new RandomLength("length", {
    min: 2,
    max: 2
})

const pw = new RandomPassword("pw", {
    length: randomLength.length
})

export const password = pw.password;