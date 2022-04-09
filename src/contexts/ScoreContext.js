import React, { useState } from "react";

const ScoreContext = React.createContext();

const ScoreProvider = ({ children }) => {
  //Etapta kaçıncı soruda
  const [sessionQ, setSessionQ] = useState(0);
  //Toplam kaç soru
  const [totalQ, setTotalQ] = useState(0);
  //Etapta kaç doğru
  const [sessionCA, setSessionCA] = useState(0);
  //Toplam kaç doğru
  const [totalCA, setTotalCA] = useState(0);
  //Etapta kaç puan
  const [sessionP, setSessionP] = useState(0);
  //Toplam kaç puan
  const [totalP, setTotalP] = useState(0);
  //Tur sayısı
  const [tour, setTour] = useState(0);

  //Soru sayısını bir artır
  const kacSoru = (data) => {
    setSessionQ(sessionQ + 1);
  };

  //Doğru sayısını bir artır
  const kacDogru = (data) => {
    setSessionCA(sessionCA + 1);
  };

  //Puanı sayısını içindeki kadar artır
  const kacPuan = (data) => {
    setSessionP(sessionP + data);
  };

  const checkPoint = () => {
  //Gelen değer yoksa etapla büyük toplamı topla, localstorage'a yaz; değer varsa localStorage'dan değer çekilip totale yaz; totali totalState'lere yaz
    !localStorage.getItem("totalP") && localStorage.setItem("totalP", 0);
    !localStorage.getItem("totalQ") && localStorage.setItem("totalQ", 0);
    !localStorage.getItem("totalCA") && localStorage.setItem("totalCA", 0);
    setTotalCA(localStorage.getItem("totalCA"));
    setTotalQ(localStorage.getItem("totalQ"));
    setTotalP(localStorage.getItem("totalP"));
  };

  //Tur sayısını bir artır
  const newGame = () => {
    setTour(tour+1);
  };

  return (
    <ScoreContext.Provider
      value={{
        sessionQ,
        totalQ,
        sessionCA,
        totalCA,
        sessionP,
        totalP,
        tour,
        kacSoru,
        kacDogru,
        kacPuan,
        checkPoint,
        newGame        
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreContext, ScoreProvider };
