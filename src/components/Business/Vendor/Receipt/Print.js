import React from 'react'
import { PDFViewer,PDFDownloadLink, Document, Page, Image, Text,StyleSheet, View } from '@react-pdf/renderer';
import logoImg from "../../../../assets/category.png"

const styles = StyleSheet.create({
    page: { 
        marginTop: "30px", 
        marginLeft: "300px" 
    },
    image: {
        width : 150, 
        height: 150,  
        backgroundColor: 'grey', 
        padding: 10
     },
    logo: {
        
    },
    firstContainer:{
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-evenly",

    },
    topHeader:{
        marginLeft: "400px", 
    },
    secondContainer:{
        marginTop: "20px",
        display: "flex",
        flexDirection:"row",
        justifyContent: "space-evenly",
    },
    borderLine:{
        width: "100",
        height: "1px",
        border: "1px solid grey"
    },
    invoice:{
        marginRight: "15px"
    },
    billing:{
        marginRight : "15px"
    },
    shipping:{
        marginRight  : "15px"
    },
    billingColor:{
        color: "red",
    },
    shippingColor:{
        color: "red",
    }
  });

const Print = () => {
    return (
    <Document>
    <Page style={styles.page} size={[1500, 600]}>
        <View style={styles.firstContainer} >
        <View>
             <Image
                style={styles.image}
                src={logoImg}
            />
            <Text>Emagz</Text>
        </View>
      
      <View style={styles.topHeader}>
        <View>
            <Text>Kazmi Cloths Collection</Text>
             <Text>Contact Us: 1800 420 111 || cs@kazmi.com</Text>
            <Text>Date: February 3, 2021</Text>
            <Text>Due Date: February 3, 2021</Text>
       </View>
      </View>  
     </View>
     {/* SECOND PARTS*/ }
     <Text style={styles.borderLine}></Text>
     <View style={styles.secondContainer} >
     <View >
        <View style={styles.invoice}>
            <Text>Order ID: 24SDFSD435D</Text>
             <Text>Order Date: 12-04-2021</Text>
            <Text>Invoice No: 34234JGFHJ6</Text>
            <Text>Invoice No: 34234JGFHJ6</Text>
       </View>
      </View>  
      <View >
        <View style={styles.invoice}>
            <Text style={styles.billingColor}>Billing Address</Text>
            <Text>5th Floor, Santosh Enclave,</Text>
             <Text>14 Chinar Park, Tegharia,</Text>
            <Text>Rajarhat, Kolkata, West Bengal 700157</Text>
            <Text>Phone :6201031126</Text>
       </View>
      </View>  
      <View >
        <View>
             <Text style={styles.shippingColor}>Shipping Address</Text>
             <Text>Md Riyaz Ansari</Text>
            <Text>5th Floor, Santosh Enclave,</Text>
            <Text>4, Chinar Park, Tegharia,</Text>
            <Text>Rajarhat, Kolkata, West Bengal</Text>
            <Text>700157</Text>
       </View>
      </View>  
     </View>
    </Page>
  </Document>
    )
}

export default Print
