module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      unnecessaryWrapper:
        "An unnecessary wrapper tag was identified. Use a React Fragment with empty tags <></> instead.",
    },
  },
  create: function (context) {
    return {
      ReturnStatement(node) {
        if (node.argument.type === "JSXElement") {
          const wrapper = node.argument;
          const children = wrapper?.children?.filter(
            (child) => child.type === "JSXElement"
          );

          if (
            children.length > 1 &&
            wrapper?.openingElement?.name?.name === "div"
          ) {
            context.report({ node, messageId: "unnecessaryWrapper" });
          }
        }
      },
    };
  },
};
