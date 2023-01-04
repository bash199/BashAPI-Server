import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import Collection from "../resources/AllResources";
import NewResource from "../resources/NewResource";

const HomeDiv = styled.div`
   width: 100%;
   height: 100vh;
   display: grid;
   justify-content: center;
`;

const InnerDiv = styled.div`
   max-width: 920px;
   width: 80vw;
   height: 100vh;
   padding: 5px;
`;
const NewResourceBtn = styled.button`
   width: 150px;
   height: 33px;
   background-color: #2b353d84;
   color: white;
   font-size: 15px;
   border-radius: 6px;
   border: none;
   cursor: pointer;
   &:active {
      transform: scale(0.98);
      transition: all 0.1s ease-in;
   }
`;

const H1 = styled.h3`
   width: fit-content;
   font-size: medium;
   letter-spacing: 1px;
   margin: 2px;
`;

const ApiBox = styled.div`
   width: 100%;
   height: 150px;
   border: 2px solid #eee;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   border-radius: 5px;
`;

const ApiInnerContainer = styled.div`
   width: calc(100% - 10px);
   height: 70%;
   background-color: #fafafa;
   padding: 0 5px;
   word-wrap: break-word;
`;

const NewResBtnContainer = styled.div`
   width: calc(100% - 10px);
   height: 30%;
   padding: 0 5px;
   display: flex;
   align-items: center;
`;

const Dashboard = () => {
   const [collections, setCollections] = useState([]);
   const [resource, setResource] = useState(false);
   const [token] = useState(localStorage.getItem("BashApitoken"));

   const getCollections = async () => {
      const {data} = await Api.get(`/collection/${token}`);
      setCollections(data);
   };

   useEffect(() => {
      getCollections();
      return () => {};
      // eslint-disable-next-line
   }, []);

   return (
      <HomeDiv>
         <InnerDiv>
            <ApiBox>
               <ApiInnerContainer>
                  <H1>API endpoint:</H1>
                  <small>https://bashapi.onrender.com/doc/{token}/:endpoint</small>
               </ApiInnerContainer>
               <NewResBtnContainer>
                  <NewResourceBtn onClick={() => setResource((prev) => !prev)}>
                     New Resource
                  </NewResourceBtn>
               </NewResBtnContainer>
            </ApiBox>
            {resource && <NewResource setResource={setResource} />}
            {collections.map((collection) => {
               return (
                  <Collection
                     getCollections={getCollections}
                     key={collection._id}
                     collection={collection}
                  />
               );
            })}
         </InnerDiv>
      </HomeDiv>
   );
};

export default Dashboard;
