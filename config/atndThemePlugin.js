
const { getLessVars } = require('antd-theme-generator');
const path = require("path");
const fs = require("fs");

const stylePath = path.resolve(__dirname,'./src/assets/style');
const globalVars  = path.join(stylePath,'./vars.less')

const themeVariables = getLessVars(path.join(__dirname, globalVars))
const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less')
const darkVars = { ...getLessVars('./node_modules/antd/lib/style/themes/dark.less'), '@primary-color': defaultVars['@primary-color'] };
const lightVars = { ...getLessVars('./node_modules/antd/lib/style/themes/compact.less'), '@primary-color': defaultVars['@primary-color'] };
fs.writeFileSync('./src/assets/style/dark.json', JSON.stringify(darkVars));
fs.writeFileSync('./src/assets/style/light.json', JSON.stringify(lightVars));
fs.writeFileSync('./src/assets/style/theme.json', JSON.stringify(themeVariables));

const options = {
    stylesDir: path.join(__dirname,stylePath),
    antDir: path.join(__dirname, './node_modules/antd'),
    varFile: path.join(__dirname, globalVars),
    themeVariables: Array.from(new Set([
        ...Object.keys(darkVars),
        ...Object.keys(lightVars),
        ...Object.keys(themeVariables),
    ])),
    generateOnce: false, // generate color.less on each compilation
}

const AntdThemePlugin = require('antd-theme-webpack-plugin');

export const AntdThemePlugin =  new AntdThemePlugin(options)