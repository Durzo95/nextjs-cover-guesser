<p align="center">
  <img src="https://i.imgur.com/K55Wtcr.png">
</p>

# Cover Guesser

A web game where the user tries to guess the name of the pixelated video game cover. The image gets less pixelated for each incorrect guess.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). First project using React.

The purpose of this site was to solidy the learning of:

- [React](https://reactjs.org/) to learn how to utilize a front-end framework to create dynamic online applications
- [NextJS](https://nextjs.org/) for the backend API utility, as well as learning about Server Side and Static Page rendering.
- [React-Bootstrap](https://react-bootstrap.github.io/) for helping building a responsive webpage
- API usage with client side applications

## Table of Contents

- [Cover Guesser](#cover-guesser)
  - [Table of Contents](#table-of-contents)
  - [Author](#author)
  - [Demo](#demo)
  - [Screenshot](#screenshot)
  - [Tech Stack](#tech-stack)
  - [Lessons Learned](#lessons-learned)
    - [React](#react)
    - [NextJS](#nextjs)
    - [Bootstrap, HTML, CSS](#bootstrap--html--css)
    - [Source Control](#source-control)
  - [Getting Started](#getting-started)

## Author

[Gerardo Guerrero](https://www.linkedin.com/in/gerardo-guerrero2/)

## Demo

[Link to Demo Application](https://coverguesser.jerryguerrero.com/)

## Screenshot

![Homepage](https://i.imgur.com/tDb7Xap.png)

## Tech Stack

**Client:** [React](https://reactjs.org/)

**Server:** [NextJS](https://nextjs.org/)

**Languages:** [Javascript](https://www.javascript.com/), HTML, CSS

**APIs:** [IGDB](https://www.igdb.com/)

## Lessons Learned

### React

- [JSX](https://reactjs.org/docs/introducing-jsx.html)
- [Components and Props](https://reactjs.org/docs/components-and-props.html)
- [Event Handling](https://reactjs.org/docs/handling-events.html) from user input
- [UseState and UseEffect hooks](https://reactjs.org/docs/hooks-intro.html)

### NextJS

- [Server Side and Static Page Rendering](https://nextjs.org/docs/basic-features/data-fetching/overview)
- [Layouts](https://nextjs.org/docs/basic-features/layouts)
- [API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Deployment to Vercel](https://nextjs.org/docs/deployment)
- [Data Fetching](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props)

### Bootstrap, HTML, CSS

- [React-Bootstrap Grid System](https://react-bootstrap.github.io/layout/grid/)
- [Responsive Design](https://react-bootstrap.github.io/layout/breakpoints/) with Bootstrap and React-Bootstrap
- [Stack Layouts](https://react-bootstrap.github.io/layout/stack/)

### Source Control

- [Github CI/CD](https://resources.github.com/ci-cd/)
- [Branches](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches)

## Getting Started

Clone the repo

```bash
git clone https://github.com/Durzo95/nextjs-cover-guesser.git
```

Install dependencies

```bash
npm install
```

Grab API credentials from IGDB at https://api-docs.igdb.com/#account-creation

Then set the following environmental variables in an `.env.local` file in the root directory for Vercel to read in

```
client_secret=
client_id=
access_token=
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
