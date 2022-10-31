const { RuleTester } = require("eslint");
const tooManyProps = require("../lib/rules/too-many-props");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("too-many-props", tooManyProps, {
  valid: [
    {
      code: `const PageHeader = ({ user, children }) => {
          
        return (
          <aside className="page-header">
            <div className="header-content">
              <strong>{name + " " + lastName}</strong>
              {email && <p>{email}</p>}
              {address && <p>{address}</p>}
              {children}
            </div>
          </aside>
        );
      };`,
    },
  ],
  invalid: [
    {
      code: `
      const PageHeader = ({ name, lastName, email, password, address, children }) => {
          
        return (
          <aside className="page-header">
            <div className="header-content">
              <strong>{name + " " + lastName}</strong>
              {email && <p>{email}</p>}
              {address && <p>{address}</p>}
              {children}
            </div>
          </aside>
        );
      };
      `,
      // we can use messageId from the rule object
      errors: [{ messageId: "tooManyProps" }],
    },
  ],
});
