// const sanityData = require("../.eleventy.js");
const sanityData = require("eleventy-plugin-sanity-data")

module.exports = function(config) {

    config.addPlugin(sanityData, {
        projectId: 'myf3wh95',
        queries: [
            {
                varName: 'pluginTest',
                query: `*[_type == "blog"] | order(_createdAt desc)`
            },
            {
                varName: 'bookmarks',
                query: `*[_type == "bookmark"] {
                    description,
                    "title": pageTitle,
                    url
                }
                    `
            }
        ]
    });


}