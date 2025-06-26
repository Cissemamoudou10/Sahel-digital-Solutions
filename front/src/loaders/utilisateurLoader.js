import axiosClient from "../utils/axiosClient";

export const utilisateurLoader = async ({ params }) => {
  try {
    const { id } = params;
    const res = await axiosClient.get(`/utilisateurs/${id}`);
    return res.data; // accessible via useLoaderData dans la page
  } catch (error) {
    throw new Response("Utilisateur non trouvé", { status: 404 });
  }
};
