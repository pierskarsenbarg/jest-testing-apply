import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

interface RandomPasswordArgs {
    length: pulumi.Input<number>
}

interface RandomPasswordData {
    password: string
}

export class RandomPassword extends pulumi.ComponentResource<RandomPasswordData> {
    public readonly password: pulumi.Output<string>;
    constructor(name: string, args: RandomPasswordArgs, opts?: pulumi.ComponentResourceOptions) {
        super("x:index:RandomComponent", name, { name, args, opts }, opts);

        const data = pulumi.output(this.getData());

        this.password = data.password;
        this.registerOutputs({
            "password": this.password
        })
    }

    protected async initialize(props: {
        name: string,
        args: RandomPasswordArgs,
        opts: pulumi.ComponentResourceOptions
    }): Promise<any> {
        const { name, args } = props;

        const pwlength = pulumi.output(args.length).apply(length => {
            if (length <= 1) {
                throw new Error("invalid length")
            }

            return length;
        })

        const generatedPassword = new random.RandomPassword(name, {
            length: pwlength
        }, {parent: this});

        return {
            password: generatedPassword.result
        };
    }
}