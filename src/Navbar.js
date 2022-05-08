import React from 'react';
import { FaShoppingCart } from "react-icons/fa";

const Navbar = (props) => {

    return(
        
        <div style={styles.nav}> 
            <div style={styles.cartName}> My Cart </div>
            <div style={styles.cartIconContainer}>
              <FaShoppingCart style={styles.cartIcon} />
                <span style={styles.cartCount}> {props.count} </span>
            </div>            
        </div>
    );
}

const styles = {

    cartIcon: {
      fontSize: 40,
      color: 'white',
      height: 32,
      marginRight: 40
    },

    cartName:{
      fontSize: 40,
      color: '#ec4747',
      fontFamily: 'sans-serif',
      marginRight: 1220,
      fontWeight: 800
    },

    nav: {
      height: 75,
      background: 'black',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },

    cartIconContainer: {
      position: 'relative'
    },

    cartCount: {
      background: '#ec4747',
      borderRadius: '50%',
      padding: '4px 10px',
      position: 'absolute',
      fontWeight: 800,
      right: 20,
      top: -9
    }
  };


export default Navbar;