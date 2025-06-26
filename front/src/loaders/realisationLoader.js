import axiosClient from "../utils/axiosClient";

export const realisationLoader = async ({ params }) => {
  try {
    const { id } = params;
    const res = await axiosClient.get(`/realisations/${id}`);
    return res.data; // accessible via useLoaderData
  } catch (error) {
    throw new Response("Réalisation non trouvée", { status: 404 });
  }
};
