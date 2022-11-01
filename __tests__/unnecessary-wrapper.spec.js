const { RuleTester } = require("eslint");
const unnecessaryWrapper = require("../lib/rules/unnecessary-wrapper");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("unnecessary-wrapper", unnecessaryWrapper, {
  valid: [
    {
      code: `
      export default function Component(props) {
        return (
          <>
            <form>
              <input type="text" />
              <input type="button" value="Post" />
            </form>
            <button>This is a button example</button>
          </>
        );
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      export default function Component(props) {
        return (
          <div>
            <form>
              <input type="text" />
              <input type="button" value="Post" />
            </form>
            <button>This is a button example</button>
          </div>
        );
      }
      `,
      // we can use messageId from the rule object
      errors: [{ messageId: "unnecessaryWrapper" }],
    },
  ],
});
