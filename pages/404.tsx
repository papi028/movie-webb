import { PATH } from "constants/path";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="page">
      <h1 className="heading text-gradient">404</h1>
      <h2 className="title">Something is not right</h2>
      <p className="description">We can not find the page you are looking for.</p>
      <Link href={PATH.home}>
        <a className="goback">Return Home</a>
      </Link>
      <style jsx>{`
        .page {
          gap: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          min-height: 100vh;
          padding: 10px;
        }
        .heading {
          font-size: 8rem;
          line-height: 1;
          background-image: var(--gradient-purple);
        }
        .title {
          color: #f6eafb;
          font-size: 2.8rem;
          font-weight: 500;
        }
        .description {
          color: #b48eca;
          font-weight: 500;
          font-size: 2.2rem;
        }
        .goback {
          color: white;
          padding: 10px 24px;
          border-radius: 8px;
          background-image: var(--gradient-purple);
        }
        @media screen and (max-width: 767.98px) {
          .title {
            font-size: 2.4rem;
          }
          .description {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PageNotFound;
