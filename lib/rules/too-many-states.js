module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      tooManyStates: "Too many states",
    },
  },
  create: function (context) {
    return {
      BlockStatement(node) {
        const useStateDeclarations = node.body.filter(
          (node) =>
            node.type === "VariableDeclaration" &&
            node.declarations[0].init.callee.name === "useState"
        );
        if (useStateDeclarations.length > 4) {
          context.report({ node, messageId: "tooManyStates" });
        }
      },
    };
  },
};
