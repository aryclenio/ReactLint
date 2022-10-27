const { RuleTester } = require("eslint");
const tooManyStates = require("../../../lib/rules/too-many-states");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("too-many-states", tooManyStates, {
  valid: [
    {
      code: `const PageHeader = ({ children }) => {
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        
        return (
          <header className="page-header">
            <div className="header-content">
              <strong>{title}</strong>
              {description && <p>{description}</p>}
              {children}
            </div>
          </header>
        );
      };`,
    },
  ],
  invalid: [
    {
      code: `
        const PageHeader = ({ children }) => {
          const [title, setTitle] = useState("");
          const [description, setDescription] = useState("");
          const [description2, setDescription2] = useState("");
          const [description3, setDescription3] = useState("");
          const [description4, setDescription4] = useState("");
          const [description5, setDescription5] = useState("");
          
          return (
            <header className="page-header">
              <div className="header-content">
                <strong>{title}</strong>
                {description && <p>{description}</p>}
                {children}
              </div>
            </header>
          );
      };
      `,
      // we can use messageId from the rule object
      errors: [{ messageId: "tooManyStates" }],
    },
  ],
});
