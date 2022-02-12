"use strict";

const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http:/localhost:9200",
});

async function run () {

    // Let's search!
    const body = await client.search({
      index: 'taxonomy',
      body: {
        query: {
            query_string: {
              fields: [ "unit_name1^3", "unit_name2^2","unit_name3^1","english_name^5", "note" ],
              query: "weed" }
          }
      }
    })

    console.log(JSON.stringify(body))
    console.log('--------------------------------------')

    for (var i = 0; i < body.hits.total.value; i++){
        // All the hits
        console.log(body.hits.hits[i]._source.english_name)
      }
}

  run().catch(console.log)
