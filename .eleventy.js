const blocksToMd = require('@sanity/block-content-to-markdown')
const sanityClient = require('@sanity/client')
const {AssetCache} = require("@11ty/eleventy-cache-assets");




module.exports = async function(eleventyConfig, config) {
    const { queries = [{varName: 'allData', query: '*[]'}], projectId, cdn = true, dataset = "production" } = config
    if (projectId == null) return console.assert(projectId != null, '\x1b[31m No project Id was specified')
    
    const client = sanityClient({
        projectId: projectId,
        dataset: dataset,
        useCdn: cdn // `false` if you want to ensure fresh data
    })
    
    queries.forEach(item => {
        eleventyConfig.addGlobalData(
            item.varName,
            async() => {
                let asset = new AssetCache(item.varName);
                console.log('asset check', {asset})

                if(asset.isCacheValid("1d")) {
                    // return cached data.

                    console.log(asset.getCachedValue())
                    return asset.getCachedValue(); // a promise
                }

                const data = await client.fetch(item.query)
                const preppedData = data.map(prepNewsletter)
                await asset.save(preppedData, "json");

                console.log('\x1b[32m',item.varName, ': ',  `Loaded ${preppedData.length} items`)
                return preppedData
            }
        )
    })
    
}




function prepNewsletter(data) {
    data.body = blocksToMd(data.body,{serializers})
    data.date = data.publishDate
    return data
}

const serializers = {
    types: {
        code: props => '```' + props.node.language + '\n' + props.node.code + '\n```'
    }
}