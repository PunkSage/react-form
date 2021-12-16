export default (value) => {
  return [
    {
      name: "New Zeland number",
      condition: () =>
        new Promise((resolve, reject) => {
          if (value < 18) {
            reject("too young")
          } else {
            resolve()
          }
        }),
      description: "The number is incorrect"
    }
  ]
    .filter((rule) => rule?.condition())
    .map((rule) => rule.description)
}
