import React, { Children, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
//Components & ReduxModules
import {
  fetchDataSetLocalStorage,
  setInitialData,
} from "../redux/modules/fanLetterDataSlice";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
function Layout() {
  console.log("LayOut Render");
  const getData = localStorage.getItem("Tooniverse");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const getLocalStorageItem = useCallback(() => {
    const parseData = JSON.parse(getData);
    return parseData;
  }, [getData]);

  useEffect(() => {
    console.log("Layout useEffect :", "render");
    const getItem = getLocalStorageItem();
    if (getItem === null) return dispatch(fetchDataSetLocalStorage());
    dispatch(setInitialData(getItem));
  }, [dispatch, getLocalStorageItem]);

  // login 시, localStorage에 있는 accessToken 말고 redux에 있는 auth에 있는 걸로  home 보여주기, 아니면 login만 주구장창 보여주긔, 가엽긔
  useEffect(() => {
    auth.accessToken ? navigate("/home") : navigate("/login");
  }, [auth, navigate]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
