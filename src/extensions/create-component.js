module.exports = (toolbox) => {
  const { filesystem, template, print: { success, error } } = toolbox;

  async function isReactNative() {
    const package = await filesystem.read('package.json', 'json');

    return !!package.dependencies['react-native'];
  }

  async function isTypeScript() {
    const package = await filesystem.read('package.json', 'json');

    const mobile = !!package.devDependencies['typescript'];
    const web = !!package.dependencies['typescript'];

    return mobile || web;
  }


  async function createComponent(folder, name) {
    if (!name) {
      error('Name must be specified');
      return
    }

    const templateType = (await isTypeScript())
      ? 'component-ts.js.ejs'
      : 'component.js.ejs';

    const templateExtension = (await isTypeScript()) ? 'tsx' : 'js';

    await template.generate({
      template: templateType,
      target: `${folder}/${name}/index.${templateExtension}`,
      props: { name },
    })

    const extensionType = (await isTypeScript()) ? 'ts' : 'js';

    const styleTemplate = (await isReactNative())
      ? 'styles-rn.js.ejs'
      : 'styles-react.js.ejs'

    await template.generate({
      template: styleTemplate,
      target: `${folder}/${name}/styles.${extensionType}`,
    })

    success(`Generated ${folder}/${name}.`)
  }

  toolbox.createComponent = createComponent
};
