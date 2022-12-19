module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noMissingKey:
        "Missing key attribute on opening map element tag. Add a key attribute to prevent rendering issues.",
    },
  },
  create: function (context) {
    return {
      JSXExpressionContainer(node) {
        if (
          node?.expression?.type === "CallExpression" &&
          node?.expression?.callee?.property?.name === "map"
        ) {
          const mapTag = node.expression.arguments[0].body;

          const hasKeyAttr = mapTag?.openingElement?.attributes.filter(
            (attr) => attr.name.name === "key"
          ).length;

          if (!hasKeyAttr) context.report({ node, messageId: "noMissingKey" });
        }
      },
    };
  },
};
