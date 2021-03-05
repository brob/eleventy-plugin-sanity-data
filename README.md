# 11ty Sanity Data Source

*This currently only works in 11ty v1.0.0 (canary). It uses [addGlobalData](https://www.11ty.dev/docs/data-global-custom/) which allows for data plugins like this*

## Installation

Install the NPM package

```sh
npm install eleventy-plugin-sanity-data
```

Add the plugin to your .eleventy.js config file. *Make sure you're running Eleventy v1.0.0+*

```js
module.exports = function(config) {
    config.addPlugin(sanityData, {
        projectId: 'YOUR_SANITY_PROJECT_ID'
    });
}
```

This will return all the data from the project specified.

## Configuration

There are configuration options you can use to return different sets of data, different projections, different datasets, and more.

| property | type | description |
| -------- | ---- | ----------- |
| projectId | string | Your Sanity.io project ID |
| cdn | boolean | Whether or not to use the Sanity CDN for data |
| dataset | string | The dataset name for your Sanity data |
| queries | array | *default returns allData variable with a query of `*[]`* An array of objects providing GROQ queries to return specific queries to specific variables. *Optional*. Each object requires a `varName` and `query` and has an optional `cacheDuration` to override global cache timing. `{ varName: 'NameForTemplate', query: '*[_type == 'something']'` |
| globalCacheDuration | string | *default: 1d*. This is a time string that corresponds to [11ty asset cache plugin times](https://www.11ty.dev/docs/plugins/cache/#change-the-cache-duration). |



## Caching

By default, the plugin will cache the data locally in a `.cache` directory in your project (using 11ty's Asset Cache plugin). It has a global cache timeout of `1d` but can be modified to shorter or longer periods with the `globalCacheDuration` config property or on a specific query with a query optional parameter `cacheDuration`.