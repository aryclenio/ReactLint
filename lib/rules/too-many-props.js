module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      tooManyProps: "Too many props",
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
