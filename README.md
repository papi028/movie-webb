# NetFilm
A Website To Watch HD Movies, Anime And TV Online For Free Using NextJS

## Overview

 - Official website: https://net-film.vercel.app
-  Author: Nguyễn Hoàng Lâm ( [@lamhoang1256](https://github.com/lamhoang1256) )

## Preview

![preview-home](https://user-images.githubusercontent.com/61537853/204072011-651a0c31-77d8-4315-ba98-4aeaba86c405.png)

## Resources

- API: https://documenter.getpostman.com/view/18986031/UVXdNeFD?fbclid=IwAR3XYwO8C563AuepUFWNFDs9iJzc3jfTWybQRWUekZX4PNWeiGBum_CiRKk
- My API Docs: https://net-film.vercel.app/api-doc
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

## Screenshots

<details>
 <summary>Home page</summary>
 <p>

 </p>![home](https://user-images.githubusercontent.com/61537853/204232492-0ac367a2-26bd-4f56-8805-c9e0e126edb8.png)

</details>

<details>
 <summary>Watch Page</summary>
 <p>
  
![watch](https://user-images.githubusercontent.com/61537853/204232614-e0a41e92-5c6d-47c7-b938-bad7c27b85a2.png)

</details>

<details>
 <summary>Search Page</summary>
 <p>

![search](https://user-images.githubusercontent.com/61537853/204232669-eb1369f1-f821-4701-9258-05589e2dc47e.png)
</details>

<details>
 <summary>Profile Page</summary>
 <p>
  
![profile](https://user-images.githubusercontent.com/61537853/204232724-e76baba7-34eb-47bf-bc83-ffa0325c00ff.png)

</details>

<details>
 <summary>Change Password Page</summary>
 <p>

![password](https://user-images.githubusercontent.com/61537853/204232781-76303444-2769-414e-b8cc-22277e68aa48.png)

</details>

<details>
 <summary>News Page</summary>
 <p>
  
![news](https://user-images.githubusercontent.com/61537853/204232812-5f6fe634-2835-4226-ba02-bd934f03f30a.png)
  
</details>

<details>
 <summary>News Details Page</summary>
 <p>

![news-details](https://user-images.githubusercontent.com/61537853/204232877-cb698a79-1ed9-410a-9381-a74e922473f6.png)

</details>

<details>
 <summary>Explore Page</summary>
 <p>

![explore](https://user-images.githubusercontent.com/61537853/204232929-7e0b4547-dc03-480a-9224-dd4c5acc13a0.png)
  
</details>


<details>
 <summary>Discovery Page</summary>
 <p>

  ![discovery](https://user-images.githubusercontent.com/61537853/204233019-5b1114a3-174d-43fb-a263-ae571e118e42.png)

</details>


<details>
 <summary>History Page</summary>
 <p>

![history](https://user-images.githubusercontent.com/61537853/204233059-0601154e-2591-4f55-b9a5-bc5a892fb251.png)

</details>

<details>
 <summary>Sign In Page</summary>
 <p>

![sign-in](https://user-images.githubusercontent.com/61537853/204233151-a5b04107-37ff-47fb-a2f7-6307449875eb.png)

</details>

<details>
 <summary>Sign Up Page</summary>
 <p>

![sign-up](https://user-images.githubusercontent.com/61537853/204233224-0e3f827e-f149-4d76-be1c-1dd6bcb6dae1.png)

</details>

<details>
 <summary>Star Info Page</summary>
 <p>

![star](https://user-images.githubusercontent.com/61537853/204233253-c88384ee-265f-4111-b365-a65000a25673.png)

</details>

<details>
 <summary>Page Not Found</summary>
 <p>

![404](https://user-images.githubusercontent.com/61537853/204233336-52b20cca-603d-47da-b419-606599332ce6.png)

</details>

<details>
 <summary>Mobile</summary>
 <p>

  ![mobile](https://user-images.githubusercontent.com/61537853/204233446-ddb1164d-c8b0-4c3c-a49e-3b967a6ccf8b.jpg)

</details>

### 👉 If you like this project, give it a star ✨ and share 👨🏻‍💻 it to your friends 👈
