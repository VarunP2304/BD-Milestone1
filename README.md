# BD-Milestone1

This is a Backend Project using JavaScript for Mini Search Engine for Articles

Features:
1] Add articles with a title,content,tags
2] Search articles by keywords in the title or content
3] Sort search results by date

Endpoints:
Add article: POST /articles
Search article: GET /articles/search?q=
View Article by ID: GET /articles/id
View all articles: GET /articles/all

Files used:
1] post.html
a simple html form to post the articles
does not allow default values to be posted 

2] mini_search.js
POST articles
GET articles by content,id,all articles
