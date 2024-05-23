import {RandomPassword} from "./RandomPassword"
import {RandomLength} from "./RandomLength";
import * as random from "@pulumi/random";

const randomLength = new RandomLength("length", {
    min: 1,
    max: 1
})

const pw = new RandomPassword("pw", {
    length: randomLength.length
})

export const password = pw.password;
