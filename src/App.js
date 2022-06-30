import { useEffect, useState } from "react";

function App() {

  const [state, setState] = useState({
    users: null,
    posts: null,
    comments: null,
    all: null
  })


  useEffect(() => {
    getFetchData();
  }, [])


  const getFetchData = async () => {

    try {
      const responses = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/comments')
      ])

      const data = await Promise.all(responses.map((response) => response.json()));

      console.log(data);

      const [users, posts, comments] = data;

      const textos = [
        ...users.map(user => user?.name),
        ...posts.map(post => post?.title),
        ...comments.map(comment => comment?.email)
      ]
      console.log(textos);

      console.log(users);
      console.log(posts);
      console.log(comments);

      setState({
        users,
        posts,
        comments,
        all: textos
      })

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <ul className="list-group">
            {
              !!state.all &&
              state.all.map((texto, index) => (<li className="list-group-item" key={index}>{texto}</li>))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
