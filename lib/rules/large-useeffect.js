module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      largeUseEffect:
        "Large useEffect bad smell identified. \
      If a useEffect hook have more than 10 lines it is considered large. To fix it, consider splitting different logics into multiple useEffect hooks.",
    },
  },
  create: function (context) {
    return {
      BlockStatement(node) {
        const useEffectDeclarations = node.body.filter(
          (node) =>
            node.type === "ExpressionStatement" &&
            node?.expression?.callee?.name === "useEffect"
        );
        useEffectDeclarations.forEach((declaration) => {
          if (
            declaration?.expression?.loc?.end?.line -
              declaration?.expression?.loc?.start?.line >=
            10
          )
            context.report({ node, messageId: "largeUseEffect" });
        });
      },
    };
  },
};
