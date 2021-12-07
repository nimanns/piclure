export default function posts(){
  return<h1>hey</h1>
}


export function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: "/posts/1",
    },
    props: {},
  };
}

