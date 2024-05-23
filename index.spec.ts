import * as pulumi from "@pulumi/pulumi";
import "jest";

function promiseOf<T>(output: pulumi.Output<T>): Promise<T> {
  return new Promise((resolve) => output.apply(resolve));
}

describe("password test", () => {
  let module: typeof import("./RandomPassword");

  beforeAll(() => {
    pulumi.runtime.setMocks({
      newResource: (
        args: pulumi.runtime.MockResourceArgs
      ): { id: string; state: any } => {
        return {
          id: `${args.name}_id`,
          state: args.inputs,
        };
      },
      call: (args: pulumi.runtime.MockCallArgs) => {
        return args.inputs;
      },
    });
  });

  beforeEach(async () => {
    module = await import("./RandomPassword");
  });

  describe("password length", () => {
    it("must throw exception", async () => {
      expect(() => {
        const pw = new module.RandomPassword("name", {
          length: 1,
        });
      }).rejects.toThrow();
    });
  });
});
