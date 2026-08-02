import {
  Upload
} from "lucide-react";



interface Props {

  onUpload: () => void;

}





export default function InsightsHeader({

  onUpload

}: Props){



  return (

    <header

      className="
        pt-8
        pb-4
        flex
        items-center
        justify-between
      "

    >


      <div>


        <h1

          className="
            text-3xl
            font-bold
            tracking-tight
          "

        >

          Insights

        </h1>


        <p

          className="
            text-sm
            text-gray-500
            mt-1
          "

        >

          Instagram analytics

        </p>


      </div>





      <button

        onClick={onUpload}

        className="
          w-12
          h-12
          rounded-full
          bg-white/10
          border
          border-white/10
          flex
          items-center
          justify-center
          hover:bg-white/20
          transition
        "

      >

        <Upload

          size={22}

        />

      </button>




    </header>

  );

}
