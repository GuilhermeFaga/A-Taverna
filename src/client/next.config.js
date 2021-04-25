module.exports = {
  async rewrites() {
    return [
      {
        source: "/magias/:id*",
        destination: "/magias",
      },
      {
        source: "/",
        destination: "/",
      },
    ];
  },
  distDir: "../../dist/client",
};
