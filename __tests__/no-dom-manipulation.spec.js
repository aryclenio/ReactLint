const { RuleTester } = require("eslint");
const noDomManipulation = require("../lib/rules/no-dom-manipulation");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("no-dom-manipulation", noDomManipulation, {
  valid: [
    {
      code: `
        export default function Component(props) {

      useEffect(() => {
        
      }, []);
    
      return <div>{props.children}</div>
    }`,
    },
  ],
  invalid: [
    {
      code: `
      export default function Component(props) {

        useEffect(() => {
          const element = document.createElement("div");
          element.innerHTML = "Hello World";
          document.body.appendChild(element);
        }, []);
      
        return <div>{props.children}</div>
      }
      `,
      // we can use messageId from the rule object
      errors: [
        { messageId: "noDomManipulation" },
        { messageId: "noDomManipulation" },
      ],
    },
  ],
});
