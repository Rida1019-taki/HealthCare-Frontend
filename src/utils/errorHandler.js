import { toast } from "react-toastify";

export const handleApiError = (error) => {

    if (!error.response) {
        toast.error("Erreur réseau. Vérifiez votre connexion Internet.");
        return;
    }

    switch (error.response.status) {

        case 400:
            toast.error("Requête invalide.");
            break;

        case 401:
            toast.error("Vous devez vous connecter.");
            break;

        case 403:
            toast.error("Accès refusé.");
            break;

        case 404:
            toast.error("Aucune donnée disponible.");
            break;

        case 500:
            toast.error("Le serveur ne répond pas.");
            break;

        default:
            toast.error("Une erreur est survenue.");
    }

    console.error(error);

};