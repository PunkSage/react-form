export default (value) => {
  return [
    {
      name: "Incorrect",
      condition: () =>
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        ),
      description: "Incorrect email address. Please verify it"
    }
  ]
    .filter((rule) => rule.condition())
    .map((rule) => rule.description)
}
