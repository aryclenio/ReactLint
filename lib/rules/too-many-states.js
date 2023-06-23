module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      tooManyStates:
        "Too many states bad smell identified. The bad smell too many states\
      consists in having more than 4 states declared under the same component.",
    },
  },
  create: function (context) {
    return {
      BlockStatement(node) {
        const useStateDeclarations = node.body.filter(
          (node) =>
            node.type === "VariableDeclaration" &&
            node.declarations[0]?.init?.callee?.name === "useState"
        );
        if (useStateDeclarations.length > 5) {
          context.report({ node, messageId: "tooManyStates" });
        }
      },
    };
  },
};
