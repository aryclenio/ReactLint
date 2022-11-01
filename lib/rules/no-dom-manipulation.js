module.exports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      noDomManipulation:
        "DOM manipulation indentified. The usage of DOM manipulation is not recommended on React application and may cause performace issues. Please consider using React refs or excluding the document API call.",
    },
  },
  create: function (context) {
    return {
      MemberExpression(node) {
        if (node.object.name === "document")
          context.report({ node, messageId: "noDomManipulation" });
      },
    };
  },
};
