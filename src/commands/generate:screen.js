module.exports = {
  name: 'generate:screen',
  alias: 'cs',
  description: 'Create new page inside src/screens',
  run: async toolbox => {
    const { parameters, createComponent, strings } = toolbox

    const name = strings.pascalCase(parameters.string)

    await createComponent('src/screens', name)
  }
}
