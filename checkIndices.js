const algoliasearch = require('algoliasearch');

// AlgoliaのアプリケーションIDとAdmin APIキー
const client = algoliasearch('YOUR_ALGOLIA_APP_ID', 'YOUR_ADMIN_API_KEY');

// インデックス一覧を取得
client.listIndices()
    .then(({ items }) => {
        console.log('Indices:', items.map(index => index.name));
    })
    .catch(err => {
        console.error('Error fetching indices:', err);
    });
