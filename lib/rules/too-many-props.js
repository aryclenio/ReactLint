module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      tooManyProps:
        "Too many props bad smell identified. The bad smell too many props\
      consists in having more than 5 props declared under the same component. To fix it, consider joining the props inside and object\
      or using a state management library to avoid props hell.",
    },
  },
  create: function (context) {
    return {
      ArrowFunctionExpression(node) {
        if (
          node.params[0].type === "ObjectPattern" &&
          node.params[0].properties.length > 5
        ) {
          context.report({ node: node.params[0], messageId: "tooManyProps" });
        }
      },
      FunctionDeclaration(node) {
        if (
          node.params[0].type === "ObjectPattern" &&
          node.params[0].properties.length > 5
        ) {
          context.report({ node: node.params[0], messageId: "tooManyProps" });
        }
      },
    };
  },
};
