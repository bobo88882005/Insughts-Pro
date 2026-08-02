import { useState } from "react";


export function useInstagramAnalyzer(){

  const [analysis,setAnalysis] =
    useState<any>(null);


  const [loading,setLoading] =
    useState(false);


  const [error,setError] =
    useState<string | null>(null);



  async function uploadZip(
    file:File
  ){

    setLoading(true);

    try {

      console.log(
        "ZIP:",
        file.name
      );


      // collegamento futuro al parser Instagram

    }

    catch(e){

      setError(
        "Errore caricamento file"
      );

    }

    finally{

      setLoading(false);

    }

  }



  return {

    analysis,

    loading,

    error,

    uploadZip

  };

}
