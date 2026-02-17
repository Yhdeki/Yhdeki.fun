import { Link } from 'react-router-dom';
import "./components.css";

interface Props {
  items: string[];
  title: string;
}

function ListGroup(props: Props) {
  // Convert game name to URL path
  const getGamePath = (item: string) => {
    return `/${item.toLowerCase().replace(/\s+/g, '-')}`;
  };

  return (
    <>
      <h1 className="title">{props.title}</h1>
      {props.items.map((item) => (
        <div key={item.toLowerCase()}>
          <hr />
          <li className="itemOfList">
            <Link to={getGamePath(item)}>
              <button>{item}</button>
            </Link>
          </li>
        </div>
      ))}
      <br />
    </>
  );
}

export default ListGroup;