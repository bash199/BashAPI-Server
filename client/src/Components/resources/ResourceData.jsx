import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";
export const Overlay = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: -55px;
   background-color: rgba(0, 0, 0, 0.4);
   display: grid;
   align-items: center;
   justify-items: center;
   z-index: 0;
`;

export const FormBox = styled.div`
   max-width: 600px;
   width: 50%;
   height: 50vh;
   padding: 10px;
   border-radius: 7px;
   background-color: antiquewhite;
   -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
   animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
   @media (max-width: 500px) {
      width: 80%;
      height: 100vh;
   }
   @-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

`;

const ButtonBox = styled.div`
   width: 100%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: end;
`;
const TextBox = styled.div`
   width: 100%;
   height: 90%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: center;
`;

const TextArea = styled.textarea`
   width: 100%;
   min-width: 40%;
   max-height: 100%;
`;

const ResourceData = ({setData, collection}) => {
   const [recivedData, setReciveData] = useState(null);
   const [token] = useState(localStorage.getItem("BashApitoken"));
   const collecName = reverseGeneratedName(collection.name);

   useEffect(() => {
      const getData = async () => {
         try {
            const {data} = await Api.get(`/document/${token}/${collecName}`);
            // console.log(data);
            setReciveData(data);
         } catch (err) {
            console.log(err);
         }
      };
      getData();
      // eslint-disable-next-line
   }, []);

   return (
      <div>
         <Overlay>
            <FormBox>
               <ButtonBox>
                  <button onClick={() => setData((prev) => !prev)}>X</button>
               </ButtonBox>

               <TextBox>
                  <TextArea
                     readOnly={true}
                     value={
                        recivedData
                           ? JSON.stringify(recivedData, null, 2)
                           : "Loading Data..."
                     }
                  ></TextArea>
               </TextBox>
            </FormBox>
         </Overlay>
      </div>
   );
};

export default ResourceData;
