const { RuleTester } = require("eslint");
const largeUseEffect = require("../lib/rules/large-useeffect");

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("large-useeffect", largeUseEffect, {
  valid: [
    {
      code: `
        function ReactComponent(props) {
          useEffect(() => {
            const users = getUsers().then(
              (res) => res.data
            ).catch(
              (err) => console.log(err)
            );
            setUsers(users);
          }, []);

          useEffect(() => {
            const assignments = getAssignments(users).then(
              (res) => res.data
            ).catch(
              (err) => console.log(err)
            );
            setAssignments(assignments);
          }, []);
          
          useEffect(() => {
            const avatar = getAvatars(users).then(
              (res) => res.data
            ).catch(
              (err) => console.log(err)
            );
            setAvatars(avatar);
          }, []);          
        
          return (
            <div>
              <p>This is a component</p>
            </div>
          );
        };
      `,
    },
  ],
  invalid: [
    {
      code: `
        function ReactComponent(props) {
          useEffect(() => {
            const users = getUsers().then(
              (res) => res.data
            ).catch(
              (err) => console.log(err)
            );
            const assignments = getAssignments(users).then(
              (res) => res.data
            ).catch(
              (err) => console.log(err)
            );
            const avatar = getAvatars(users).then(
              (res) => res.data
            ).catch(
              (err) => console.log(err)
            );
        
            setUsers(users);
            setAssignments(assignments);
            setAvatars(avatar);
        
          }, []);
        
          return (
            <div>
              <p>This is a component</p>
            </div>
          );
        };
      `,
      // we can use messageId from the rule object
      errors: [{ messageId: "largeUseEffect" }],
    },
  ],
});
