import {
  Upload
} from "lucide-react";





interface Props {

  onUpload: () => void;

}








export default function InsightsHeader({

  onUpload

}:Props){



  return (


    <header

      className="
        pt-8
        flex
        items-center
        justify-between
      "

    >





      <div>


        <h1

          className="
            text-4xl
            font-bold
            tracking-tight
            bg-gradient-to-r
            from-pink-500
            via-purple-500
            to-orange-400
            bg-clip-text
            text-transparent
          "

        >

          Insights

        </h1>




        <p

          className="
            mt-1
            text-sm
            text-gray-400
          "

        >

          Instagram analytics

        </p>



      </div>







      <button

        onClick={
          onUpload
        }

        className="
          w-12
          h-12
          rounded-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          flex
          items-center
          justify-center
          hover:bg-white/20
          transition
          active:scale-95
        "

      >


        <Upload

          size={22}

        />


      </button>





    </header>


  );

}
