# NetFilm
A Website To Watch HD Movies, Anime And TV Online For Free Using NextJS

## Overview

 - Official website: https://net-film.vercel.app
-  Author: Nguyễn Hoàng Lâm ( [@lamhoang1256](https://github.com/lamhoang1256) )

## Preview

![preview-home](https://user-images.githubusercontent.com/61537853/204072011-651a0c31-77d8-4315-ba98-4aeaba86c405.png)

## Resources

- API: https://documenter.getpostman.com/view/18986031/UVXdNeFD?fbclid=IwAR3XYwO8C563AuepUFWNFDs9iJzc3jfTWybQRWUekZX4PNWeiGBum_CiRKk
- Font Family: Montserrat

## Main technology used

- NextJS, Typescript
- Sass module
- Firebase
- Redux, Redux toolkit (State management)
- Axios, Swr (Support fetching data)
- Swiper (Slider), react-modal (Modal)
- React-toastify, react-hot-toast (Message UI)
- Next-swagger-doc, swagger-ui-react (Document API)
- Cheerio (Crawl data from website Loklok)
- react-hls-player (Media player video m3u8)
- Other: query-string, uuidv4, ...

## Features

- Full HD movies with subtitles in many languages
- Suggested movies you may like
- Skeleton loading, infinite scrolling movie at Home page and Explore page
- Search movie by name, with suggestion keywords, filter movie by type (category, area, year,...)
- Profile page: allowing to change profile photo avatar, fullname, password.
- Comment: allowing to give reactions, see who reacts to a comment, edit and delete comment.
- Discovery movie trailer (Short videos like TikTok)
- Save history you watch, follow movie you like
- View information of the actors in the movie
- Read latest breaking movie news
- Optimize SEO and Responsive on many devices

## Environment Variables

```
NEXT_PUBLIC_NODE_ENV = development (or production if deploy to vercel)
NEXT_PUBLIC_BASE_URL_API = https://ga-mobile-api.loklok.tv/cms/app
NEXT_PUBLIC_BASE_URL_API_SUB = https://mobile-api.netpop.app/cms/web/pc
NEXT_PUBLIC_SERVER = https://net-film.vercel.app (Link vercel)
NEXT_PUBLIC_LOCALHOST = http://localhost:3000

# See: https://firebase.google.com
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY= 
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= 
NEXT_PUBLIC_FIREBASE_PROJECT_ID= 
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= 
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= 
NEXT_PUBLIC_FIREBASE_APP_ID= 
```

## Deployment

- Create a new project on the vercel dashboard -> Add Environment Variables from .env.example
- Go to Settings -> Functions  -> Function Region -> Change the region to "Sydney, Australia"
- Redeploy the project

### 👉 If you like this project, give it a star ✨ and share 👨🏻‍💻 it to your friends 👈
