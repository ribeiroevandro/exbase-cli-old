module.exports = {
  name: 'generate:component',
  alias: 'cc',
  description: 'Create new component inside src/components',
  run: async toolbox => {
    const { parameters, createComponent, strings } = toolbox

    const name = strings.pascalCase(parameters.string)

    await createComponent('src/components', name)
  }
}
