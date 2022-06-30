import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { BaseUrl } from "../../../API";
const BusinessVendorDetails = () => {
  const location = useLocation();
  //const vendor_id = location.state.vendor_id;
  const url = window.location.href;
  const vendor_id = new URLSearchParams(window.location.search).get("v");
  useEffect(() => {
    getVendor();
  }, []);
  const getVendor = () => {
    console.log("vendor is", vendor_id);
    axios
      .get(`${BaseUrl}/vendor-all-products-list/${vendor_id}?page=1&limit=20`)
      .then((res) => {
        // axios.get(`${BaseUrl}/view-vendor/${vendor_id}`).then((res) => {
        console.log("Vendor Details", res.data);
        //   if (res.data) {
        //     setIsCartAdded(true);
        //   }
      });
  };
  useEffect(() => {
    callman();
  }, [vendor_id, url]);
  const callman = () => {
    var myDynamicManifest = {
      short_name: vendor_id,
      name: "Create App",
      description: "Something dynamic",
      icons: [
        {
          src: "http://localhost:5000/favicon.ico",
          sizes: "64x64 32x32 24x24 16x16",
          type: "image/x-icon",
        },
        {
          src: "http://localhost:5000/logo192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          src: "http://localhost:5000/logo512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      start_url: url,
      display: "standalone",
      theme_color: "#000000",
      background_color: "#ffffff",
    };

    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    console.log("mymanurl: ", manifestURL);
    console.log("json: ", stringManifest);
    document.querySelector("#myman").setAttribute("href", manifestURL);
  };
  return (
    <>
      <p>Vendor id: {vendor_id}</p>
      <p>Url: {url}</p>
    </>
  );
};

export default BusinessVendorDetails;
