export const getSimilarity = async ({ img1 = "", img2 = "" }) => {
  return await fetch("http://127.0.0.1:8000/calculate_similarity", {
    method: "POST",
    body: JSON.stringify({
      image1: img1,
      image2: img2,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data.similarity;
    })
    .catch((err) => {
      console.log(err);
    });
};
