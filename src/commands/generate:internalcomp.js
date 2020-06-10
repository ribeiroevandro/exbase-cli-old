module.exports = {
  name: 'generate:internalcomp',
  alias: 'cic',
  description: 'Create a new internal component within a screen src/screens/Example/components',
  run: async toolbox => {
    const { createComponent, strings, filesystem, print, prompt } = toolbox

    const result = await prompt.ask([
      { type: 'input', name: 'screen', message: 'What Screen?' },
      { type: 'input', name: 'component', message: 'What Component name' }
    ])

    const screenName = strings.pascalCase(result.screen);
    const componentName = strings.pascalCase(result.component);

    const screenPath = filesystem.subdirectories('./src/screens/');

    const checkScreenExist = screenPath.some(item => {
      const normalizePath = item.replace(/src\/screens\//g,'');
      return normalizePath.includes(screenName);
    })

    if(!checkScreenExist) {
      print.info(`Error creating the ${print.colors.error(screenName)}! The ${print.colors.error(componentName)} Screen not exist 😰`)
      return;
    }

    await createComponent(`src/screens/${screenName}/components`, componentName)
  }
}
