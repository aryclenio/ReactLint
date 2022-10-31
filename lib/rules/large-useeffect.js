module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      largeUseEffect: "Large useEffect",
    },
  },
  create: function (context) {
    return {
      BlockStatement(node) {
        const useEffectDeclarations = node.body.filter(
          (node) =>
            node.type === "ExpressionStatement" &&
            node.expression.callee.name === "useEffect"
        );
        useEffectDeclarations.forEach((declaration) => {
          if (
            declaration.expression.loc.end.line -
              declaration.expression.loc.start.line >=
            15
          )
            context.report({ node, messageId: "largeUseEffect" });
        });
      },
    };
  },
};
