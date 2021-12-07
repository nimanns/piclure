module.exports = {
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:8080/graphql",
      },
    ];
  },
  images: {
    domains: ["127.0.0.1", "piclureb.herokuapp.com", "res.cloudinary.com"],
  },
};
