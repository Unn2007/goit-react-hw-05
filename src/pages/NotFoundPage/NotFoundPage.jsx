import BackLink from "../../components/BackLink/BackLink";

function NotFoundPage() {
  return (
    <main>
      <div>
        <p>Nothing find!</p>
        <BackLink to={"./"}>Go home</BackLink>
      </div>
    </main>
  );
}

export default NotFoundPage;
