const express = require('express');
const app = express();
let articles = [];
let nextId = 1;
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

class Article {
    constructor(title, content, tags) {
        this.id = nextId++;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.date = new Date();
    }
}

function addArticle(title, content, tags) {
    const article = new Article(title, content, tags);
    articles.push(article);
    return article;
}

function getArticle(id) {
    return articles.find(article => article.id === parseInt(id));
}

function searchArticles(query) {
    if (!query) {
        return articles.sort((a, b) => b.date - a.date);
    }

    const searchQuery = query.toLowerCase();
    return articles
        .filter(article => {
            const titleMatch = article.title.toLowerCase().includes(searchQuery);
            const contentMatch = article.content.toLowerCase().includes(searchQuery);
            return titleMatch || contentMatch;
        })
        .sort((a, b) => b.date - a.date);
}

app.get('/articles', (req, res) => {
    res.sendFile(__dirname + '/public/post.html');
});

app.get('/articles/all', (req, res) => {
    res.json(articles);
});

app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }
    const article = addArticle(title, content, tags || []);
    res.status(201).json(article);
});

app.get('/articles/search', (req, res) => {
    const { q } = req.query;
    const results = searchArticles(q);
    res.json(results);
});

app.get('/articles/:id', (req, res) => {
    const article = getArticle(req.params.id);
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});