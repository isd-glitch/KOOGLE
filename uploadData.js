const algoliasearch = require('algoliasearch');
const fetch = require('node-fetch');

// AlgoliaのアプリケーションIDとAdmin APIキー
const client = algoliasearch('6ZZJ34WTSZ', '07e62f840d91213d3d61517577703138');
const index = client.initIndex('isd_glitch_github_io_6zzj34wtsz_pages');

// Google Custom Search JSON APIの設定
const GOOGLE_API_KEY = 'AIzaSyBVtoa6hg3M69dRRfNqAvscA4e6vjBsako';
const GOOGLE_CSE_ID = 'b56b6f4c0926441e0';

// Google Custom Search APIを使用して検索結果を取得
async function fetchGoogleResults(query) {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}`);
    const data = await response.json();
    console.log('Google API response:', data); // デバッグ用ログ
    return data.items.map(item => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet,
    }));
}

// データをAlgoliaにアップロード
async function uploadToAlgolia(query) {
    try {
        const results = await fetchGoogleResults(query);
        await index.saveObjects(results, { autoGenerateObjectIDIfNotExist: true });
        console.log('Successfully uploaded results to Algolia');
    } catch (error) {
        console.error('Error uploading to Algolia:', error);
    }
}

// 実行
uploadToAlgolia('example query');
