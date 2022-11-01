const { RuleTester } = require("eslint");
const noMissingKey = require("../lib/rules/no-missing-key");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("no-missing-key", noMissingKey, {
  valid: [
    {
      code: `
      export default function Component(props) {
        const [state, setState] = useState([1, 2, 3, 4, 5]);
      
        return (
          <div>
            {state.map((number) => (
              <p key={number}>{number}</p>
            ))}
          </div>
        );
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      export default function Component(props) {
        const [state, setState] = useState([1, 2, 3, 4, 5]);
      
        return (
          <div>
            {state.map((number) => (
              <p>{number}</p>
            ))}
          </div>
        );
      }
      `,
      // we can use messageId from the rule object
      errors: [{ messageId: "noMissingKey" }],
    },
  ],
});
