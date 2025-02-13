import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "../../../../lib/auth";
import bcryptjs from "bcryptjs";
import { updatePassword } from "../../../../lib/queries/users";

const validatePasswordFields = (
  ancienMotDePasse: string,
  nouveauMotDePasse: string,
  confirmerMotDePasse: string,
) => {
  if (!ancienMotDePasse || !nouveauMotDePasse || !confirmerMotDePasse) {
    return { isValid: false, message: "Tous les champs doivent être remplis." };
  }

  if (nouveauMotDePasse !== confirmerMotDePasse) {
    return {
      isValid: false,
      message: "Les mots de passe ne correspondent pas.",
    };
  }

  return { isValid: true, message: "" };
};

export async function POST(req: NextRequest) {
  const { ancienMotDePasse, nouveauMotDePasse, confirmerMotDePasse } =
    await req.json();

  const validationResult = validatePasswordFields(
    ancienMotDePasse,
    nouveauMotDePasse,
    confirmerMotDePasse,
  );
  if (!validationResult.isValid) {
    return NextResponse.json(
      { message: validationResult.message },
      { status: 400 },
    );
  }

  try {
    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      return NextResponse.json(
        { message: "Utilisateur non authentifié." },
        { status: 401 },
      );
    }

    const match = await bcryptjs.compare(
      ancienMotDePasse,
      authenticatedUser.password,
    );
    if (!match) {
      return NextResponse.json(
        { message: "L'ancien mot de passe est incorrect." },
        { status: 400 },
      );
    }

    if (nouveauMotDePasse === ancienMotDePasse) {
      return NextResponse.json(
        {
          message:
            "Le nouveau mot de passe ne peut pas être identique à l'ancien.",
        },
        { status: 400 },
      );
    }

    const newPasswordHash = await bcryptjs.hash(nouveauMotDePasse, 10);

    await updatePassword(authenticatedUser.id, newPasswordHash);

    return NextResponse.json(
      { message: "Mot de passe modifié avec succès !" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la modification du mot de passe:", error);
    return NextResponse.json(
      {
        message:
          "Une erreur est survenue lors de la modification du mot de passe.",
      },
      { status: 500 },
    );
  }
}
