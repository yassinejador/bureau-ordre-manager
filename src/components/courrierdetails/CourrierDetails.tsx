const CourrierDetails = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-medium text-gray-800 mb-6">
        Détails du courrier
      </h1>
      
      <div className="border-t-4 border-blue-500 p-6 rounded-lg bg-gray-50 shadow-sm">
        <div className="space-y-4">
          <p className="text-lg text-gray-700"><strong>Expéditeur :</strong> <span className="font-medium">ENCG</span></p>
          <p className="text-lg text-gray-700"><strong>Destinataire :</strong> <span className="font-medium">ENSA</span></p>
          <p className="text-lg text-gray-700"><strong>Date de création :</strong> <span className="font-medium">15 Déc 2025</span></p>
          <p className="text-lg text-gray-700"><strong>Traité par :</strong> <span className="font-medium">Ahmed</span></p>
          <p className="text-lg text-gray-700"><strong>Objet :</strong> <span className="font-medium">hh</span></p>
          <p className="text-lg text-gray-700"><strong>État :</strong> <span className="font-medium text-green-600">Départ</span></p>

          <h2 className="text-xl font-semibold mt-6 text-gray-800">📎 Fichiers joints</h2>
          <ul className="list-disc pl-6 space-y-2 text-blue-600">
            <li><a href="#" className="underline hover:text-blue-800">Document1.pdf</a></li>
            <li><a href="#" className="underline hover:text-blue-800">Image1.jpg</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourrierDetails;
