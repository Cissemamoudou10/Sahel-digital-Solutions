// src/loaders/produitLoader.js
import axiosClient from "../utils/axiosClient";

export const produitLoader = async ({ params }) => {
  try {
    const { id } = params;
    const res = await axiosClient.get(`/produits/${id}`);
    console.log(res.data)
    return res.data; // accessible via useLoaderData
  } catch (error) {
    throw new Response("Produit non trouvé", { status: 404 });
  }
};
