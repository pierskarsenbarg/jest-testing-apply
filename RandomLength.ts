import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

interface RandomLengthArgs {
    min: number,
    max: number
}

interface RandomLengthData {
    length: number
}

export class RandomLength extends pulumi.ComponentResource<RandomLengthData> {
    public readonly length: pulumi.Output<number>;
    constructor(name:string, args: RandomLengthArgs, opts?:pulumi.ComponentResourceOptions) {
        super("x:index:RandomLength", name, { name, args, opts }, opts);

        const data = pulumi.output(this.getData());
        this.length = data.length;

        this.registerOutputs({
            "length": data.length
        })
    }

    protected async initialize(props: {
        name: string,
        args: RandomLengthArgs,
        opts: pulumi.ComponentResourceOptions
    }): Promise<any> {
        const { name, args } = props;

        const randomLength = new random.RandomInteger(name, {
            max: args.max,
            min: args.min
        }, {parent: this});

        return {
            length: randomLength.result
        };
    }
}