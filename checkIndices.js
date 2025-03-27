const algoliasearch = require('algoliasearch');

// AlgoliaのアプリケーションIDとAdmin APIキー
const client = algoliasearch('6ZZJ34WTSZ', '07e62f840d91213d3d61517577703138');

// インデックス一覧を取得
client.listIndices()
    .then(({ items }) => {
        console.log('Indices:', items.map(index => index.name));
    })
    .catch(err => {
        console.error('Error fetching indices:', err);
    });
