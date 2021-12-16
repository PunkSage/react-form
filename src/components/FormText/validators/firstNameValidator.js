export default (value) => {
  return [
    {
      name: "Too short",
      condition: () => value.split("").length < 4,
      description: "Name should not be shorter than 4 characters"
    },
    {
      name: "Too long",
      condition: () => value.split("").length > 10,
      description: "Name should not be longer than 10 characters"
    }
  ]
    .filter((rule) => rule.condition())
    .map((rule) => rule.description)
}
