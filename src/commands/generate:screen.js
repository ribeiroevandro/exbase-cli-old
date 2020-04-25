module.exports = {
  name: 'generate:screen',
  description: 'Create new page inside src/screens',
  run: async toolbox => {
    const { parameters, createComponent } = toolbox

    const name = parameters.first

    await createComponent('src/screens', name)
  }
}
